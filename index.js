document.addEventListener('DOMContentLoaded', () => {
    let documentsData = [];
    
    // DOM Elements
    const tbody = document.getElementById('library-tbody');
    const searchInput = document.getElementById('search-input');
    const filterDocType = document.getElementById('filter-doc-type');
    const filterStatus = document.getElementById('filter-status');
    
    const statTotal = document.getElementById('stat-total');
    const statDownloaded = document.getElementById('stat-downloaded');
    const statPending = document.getElementById('stat-pending');

    // Dynamic Host Update
    const currentOrigin = window.location.origin + window.location.pathname.replace(/\/$/, "");
    document.getElementById('cdn-json-url').value = `${currentOrigin}/library.json`;
    document.getElementById('cdn-pdf-url').value = `${currentOrigin}/raw_sources/<refId>.pdf`;

    // Fetch library data
    fetch('./library.json')
        .then(response => {
            if (!response.ok) throw new Error('Không thể tải tệp library.json');
            return response.json();
        })
        .then(data => {
            documentsData = data;
            updateStats(data);
            renderTable(data);
        })
        .catch(err => {
            console.error('Lỗi tải danh mục tài liệu:', err);
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #dc2626; padding: 2rem;">
                        Có lỗi xảy ra khi tải danh mục tài liệu: ${err.message}
                    </td>
                </tr>
            `;
        });

    // Stats Calculator
    function updateStats(data) {
        const total = data.length;
        const downloaded = data.filter(doc => !doc.remoteOnly && doc.localPath && doc.localPath !== '').length;
        const pending = data.filter(doc => (!doc.remoteOnly || !doc.localPath || doc.localPath === '') && (!doc.sourceUrl || doc.sourceUrl === '')).length;
        
        statTotal.textContent = total;
        statDownloaded.textContent = downloaded;
        statPending.textContent = pending;
    }

    // Render Table Rows
    function renderTable(data) {
        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; color: #64748b; padding: 2rem;">
                        Không tìm thấy tài liệu phù hợp.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = '';
        
        data.forEach(doc => {
            const tr = document.createElement('tr');
            
            // Code
            const tdId = document.createElement('td');
            tdId.className = 'ref-code';
            tdId.innerHTML = `<code>${doc.refId}</code>`;
            tr.appendChild(tdId);
            
            // Title and Tags
            const tdTitle = document.createElement('td');
            const wrapper = document.createElement('div');
            wrapper.className = 'ref-title-wrapper';
            
            const titleSpan = document.createElement('span');
            titleSpan.className = 'ref-title';
            titleSpan.textContent = doc.title;
            wrapper.appendChild(titleSpan);
            
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'ref-tags';
            
            // Add Doc Type Tag
            const typeSpan = document.createElement('span');
            typeSpan.className = 'ref-tag';
            typeSpan.style.color = '#3b82f6';
            typeSpan.textContent = doc.documentType;
            tagsDiv.appendChild(typeSpan);
            
            // Add other tags
            if (doc.tags && Array.isArray(doc.tags)) {
                doc.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'ref-tag';
                    tagSpan.textContent = tag;
                    tagsDiv.appendChild(tagSpan);
                });
            }
            wrapper.appendChild(tagsDiv);
            tdTitle.appendChild(wrapper);
            tr.appendChild(tdTitle);
            
            // Authority
            const tdAuth = document.createElement('td');
            tdAuth.textContent = doc.issuingAuthority || 'Bộ Y tế';
            tr.appendChild(tdAuth);
            
            // Action Button
            const tdAction = document.createElement('td');
            tdAction.style.textAlign = 'center';
            tdAction.appendChild(createActionButton(doc));
            tr.appendChild(tdAction);
            
            tbody.appendChild(tr);
        });
    }

    // Action button creator
    function createActionButton(doc) {
        const link = document.createElement('a');

        if (doc.localPath && doc.localPath !== '') {
            link.href = '#';
            link.className = 'btn-download';
            link.textContent = 'Xem tài liệu';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openViewer(doc);
            });
        } else if (doc.remoteOnly === true || (doc.sourceUrl && doc.sourceUrl !== '')) {
            if (doc.sourceUrl && doc.sourceUrl !== '') {
                link.href = doc.sourceUrl;
                link.target = '_blank';
                link.className = 'btn-download btn-online';
                link.textContent = 'Xem online';
            } else {
                link.className = 'btn-download btn-pending';
                link.textContent = 'Chưa có link';
                link.removeAttribute('href');
                link.style.pointerEvents = 'none';
            }
        } else {
            link.className = 'btn-download btn-pending';
            link.textContent = 'Chưa có link';
            link.removeAttribute('href');
            link.style.pointerEvents = 'none';
        }
        return link;
    }

    // Viewer Logic
    let currentDoc = null;

    const viewer = document.getElementById('document-viewer');
    const viewerTitle = document.getElementById('viewer-title');
    const viewerRefId = document.getElementById('viewer-ref-id');
    const viewerDocType = document.getElementById('viewer-doc-type');
    const viewerAuthority = document.getElementById('viewer-authority');
    const pdfFrame = document.getElementById('pdf-frame');
    const markdownRender = document.getElementById('markdown-render');
    const markdownLoading = document.getElementById('markdown-loading');
    const markdownError = document.getElementById('markdown-error');
    const errorDetail = markdownError.querySelector('.error-detail');
    
    const btnCloseViewer = document.getElementById('btn-close-viewer');
    const viewerOverlay = document.getElementById('viewer-overlay');
    
    const tabBtnPdf = document.getElementById('tab-btn-pdf');
    const tabBtnMarkdown = document.getElementById('tab-btn-markdown');
    const pdfTabContent = document.getElementById('viewer-tab-content-pdf');
    const markdownTabContent = document.getElementById('viewer-tab-content-markdown');
    
    const actionNewTab = document.getElementById('viewer-action-newtab');
    const actionDownload = document.getElementById('viewer-action-download');

    function openViewer(doc) {
        currentDoc = doc;
        
        // Metadata
        viewerTitle.textContent = doc.title;
        viewerRefId.textContent = doc.refId;
        viewerDocType.textContent = doc.documentType;
        viewerAuthority.textContent = doc.issuingAuthority || 'Bộ Y tế';
        
        // Toolbar actions
        actionNewTab.href = doc.localPath || doc.sourceUrl;
        if (doc.localPath) {
            actionDownload.href = doc.localPath;
            actionDownload.style.display = 'inline-flex';
        } else {
            actionDownload.style.display = 'none';
        }
        
        // Set default tab: PDF
        tabBtnPdf.classList.add('active');
        tabBtnMarkdown.classList.remove('active');
        pdfTabContent.classList.add('active');
        markdownTabContent.classList.remove('active');
        
        // Reset Markdown Render container load status
        markdownRender.dataset.loadedRefId = '';
        
        // Load PDF
        pdfFrame.src = doc.localPath || doc.sourceUrl;
        
        // Show Modal
        viewer.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
        viewer.style.display = 'none';
        pdfFrame.src = '';
        document.body.style.overflow = '';
        currentDoc = null;
    }

    function loadMarkdownForCurrentDoc() {
        if (!currentDoc) return;
        const doc = currentDoc;
        
        if (markdownRender.dataset.loadedRefId === doc.refId) {
            return;
        }
        
        markdownLoading.style.display = 'flex';
        markdownError.style.display = 'none';
        markdownRender.innerHTML = '';
        
        fetch(`./markdown_docs/${doc.refId}.md`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Không thể tìm thấy hoặc đọc tệp Markdown (HTTP ${response.status})`);
                }
                return response.text();
            })
            .then(markdownText => {
                // Parse markdown using marked.js if available, otherwise fallback to preformatted text
                if (typeof marked !== 'undefined' && typeof marked.parse === 'function') {
                    markdownRender.innerHTML = marked.parse(markdownText);
                    
                    // Render Mermaid diagrams if present
                    const mermaidBlocks = markdownRender.querySelectorAll('pre code.language-mermaid');
                    if (mermaidBlocks.length > 0) {
                        mermaidBlocks.forEach((block, idx) => {
                            const pre = block.parentElement;
                            const codeText = block.textContent.trim();
                            
                            // Create a div wrapper for mermaid
                            const div = document.createElement('div');
                            div.className = 'mermaid';
                            div.id = `mermaid-diagram-${idx}`;
                            div.textContent = codeText;
                            
                            // Replace the pre element
                            pre.replaceWith(div);
                        });
                        
                        if (typeof mermaid !== 'undefined') {
                            try {
                                mermaid.run({
                                    nodes: markdownRender.querySelectorAll('.mermaid')
                                });
                            } catch (err) {
                                console.error('Lỗi khi render sơ đồ bằng Mermaid.js:', err);
                            }
                        }
                    }
                } else {
                    console.warn('marked.js is not loaded, fallback to pre');
                    markdownRender.innerHTML = `<pre style="white-space: pre-wrap; font-family: var(--font-stack);">${markdownText}</pre>`;
                }
                markdownRender.dataset.loadedRefId = doc.refId;
                markdownLoading.style.display = 'none';
            })
            .catch(err => {
                console.error(`Lỗi tải file markdown cho ${doc.refId}:`, err);
                markdownLoading.style.display = 'none';
                markdownError.style.display = 'flex';
                errorDetail.textContent = `Chi tiết: ${err.message}`;
            });
    }

    // Modal Close Triggers
    btnCloseViewer.addEventListener('click', closeViewer);
    viewerOverlay.addEventListener('click', closeViewer);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.style.display === 'flex') {
            closeViewer();
        }
    });

    // Modal Tabs Trigger
    const viewerTabs = viewer.querySelectorAll('.viewer-tab');
    viewerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            viewerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (targetTab === 'pdf') {
                pdfTabContent.classList.add('active');
                markdownTabContent.classList.remove('active');
            } else {
                pdfTabContent.classList.remove('active');
                markdownTabContent.classList.add('active');
                loadMarkdownForCurrentDoc();
            }
        });
    });

    // Filtering Logic
    function filterData() {
        const query = searchInput.value.toLowerCase().trim();
        const typeFilter = filterDocType.value;
        const statusFilter = filterStatus.value;

        const filtered = documentsData.filter(doc => {
            const matchesQuery = 
                doc.refId.toLowerCase().includes(query) ||
                doc.title.toLowerCase().includes(query) ||
                (doc.issuingAuthority && doc.issuingAuthority.toLowerCase().includes(query)) ||
                (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)));
                
            const matchesType = typeFilter === 'all' || doc.documentType === typeFilter;
            
            let matchesStatus = true;
            if (statusFilter === 'local') {
                matchesStatus = !doc.remoteOnly && doc.localPath && doc.localPath !== '';
            } else if (statusFilter === 'online') {
                matchesStatus = (doc.remoteOnly || !doc.localPath || doc.localPath === '') && doc.sourceUrl && doc.sourceUrl !== '';
            } else if (statusFilter === 'pending') {
                matchesStatus = (doc.remoteOnly || !doc.localPath || doc.localPath === '') && (!doc.sourceUrl || doc.sourceUrl === '');
            }

            return matchesQuery && matchesType && matchesStatus;
        });

        renderTable(filtered);
    }

    // Bind filters
    searchInput.addEventListener('input', filterData);
    filterDocType.addEventListener('change', filterData);
    filterStatus.addEventListener('change', filterData);
});

// Copy to Clipboard
function copyText(elementId) {
    const inputElement = document.getElementById(elementId);
    inputElement.select();
    inputElement.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(inputElement.value).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Lỗi copy:', err);
    });
}
