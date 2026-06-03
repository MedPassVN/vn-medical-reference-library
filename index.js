document.addEventListener('DOMContentLoaded', () => {
    let documentsData = [];
    let selectedTag = null;
    
    // Elements
    const tbody = document.getElementById('library-tbody');
    const searchInput = document.getElementById('search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const filterDocType = document.getElementById('filter-doc-type');
    const filterStatus = document.getElementById('filter-status');
    const tagPillsContainer = document.getElementById('tag-pills-container');
    
    // Stats elements
    const statTotal = document.getElementById('stat-total');
    const statDownloaded = document.getElementById('stat-downloaded');
    const statPending = document.getElementById('stat-pending');
    
    // 1. Tab Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(n => n.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            // Hide all sections
            sections.forEach(sec => sec.style.display = 'none');
            
            // Show corresponding section
            const targetId = item.getAttribute('href').substring(1);
            document.getElementById(targetId).style.display = 'block';
        });
    });
    
    // Update GitHub Pages CDN URLs dynamically based on current origin
    const cdnJsonUrl = document.getElementById('cdn-json-url');
    const cdnPdfUrl = document.getElementById('cdn-pdf-url');
    const currentOrigin = window.location.origin + window.location.pathname.replace(/\/$/, "");
    
    if (cdnJsonUrl) {
        cdnJsonUrl.textContent = `${currentOrigin}/library.json`;
    }
    if (cdnPdfUrl) {
        cdnPdfUrl.textContent = `${currentOrigin}/raw_sources/<ref_id>.pdf`;
    }

    // 2. Load Data from library.json
    fetch('./library.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Không thể tải tệp library.json');
            }
            return response.json();
        })
        .then(data => {
            documentsData = data;
            
            // Initialize Stats
            updateStats(data);
            
            // Initialize Tag Pills
            renderTagPills(data);
            
            // Render Table
            renderTable(data);
        })
        .catch(err => {
            console.error('Lỗi khi tải dữ liệu thư viện:', err);
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #ef4444; padding: 3rem;">
                        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>Không thể tải dữ liệu thư viện tài liệu tham khảo: ${err.message}</p>
                    </td>
                </tr>
            `;
        });
        
    // 3. Stats Calculator
    function updateStats(data) {
        const total = data.length;
        const downloaded = data.filter(doc => doc.local_path && doc.local_path !== '').length;
        // In library.json, if source_url is empty, it means we don't have it downloaded yet
        const pending = data.filter(doc => (!doc.local_path || doc.local_path === '') && (!doc.source_url || doc.source_url === '')).length;
        
        statTotal.textContent = total;
        statDownloaded.textContent = downloaded;
        statPending.textContent = pending;
    }
    
    // 4. Render Tags dynamically
    function renderTagPills(data) {
        // Collect all unique tags (excluding ref_ids like "VĐ 01", etc. to keep it clinical)
        const allTags = new Set();
        data.forEach(doc => {
            if (doc.tags && Array.isArray(doc.tags)) {
                doc.tags.forEach(tag => {
                    // Filter out tag if it starts with "VĐ"
                    if (!tag.startsWith('VĐ')) {
                        allTags.add(tag);
                    }
                });
            }
        });
        
        // Sort tags alphabetically
        const sortedTags = Array.from(allTags).sort();
        
        // Render
        tagPillsContainer.innerHTML = '';
        
        // Add "All" pill
        const allPill = document.createElement('span');
        allPill.className = 'tag-pill active';
        allPill.textContent = 'Tất cả';
        allPill.addEventListener('click', () => {
            selectedTag = null;
            document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
            allPill.classList.add('active');
            filterData();
        });
        tagPillsContainer.appendChild(allPill);
        
        sortedTags.forEach(tag => {
            const pill = document.createElement('span');
            pill.className = 'tag-pill';
            pill.textContent = tag;
            pill.addEventListener('click', () => {
                document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                selectedTag = tag;
                filterData();
            });
            tagPillsContainer.appendChild(pill);
        });
    }
    
    // 5. Render Table rows
    function renderTable(data) {
        if (data.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                        <i class="fa-solid fa-box-open" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>Không tìm thấy tài liệu phù hợp với bộ lọc.</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = '';
        
        data.forEach(doc => {
            const tr = document.createElement('tr');
            
            // 1. ID Column
            const tdId = document.createElement('td');
            tdId.className = 'ref-code';
            tdId.innerHTML = `<code>${doc.ref_id}</code>`;
            tr.appendChild(tdId);
            
            // 2. Title Column (with badges and tag pills)
            const tdTitle = document.createElement('td');
            
            const wrapper = document.createElement('div');
            wrapper.className = 'ref-title-wrapper';
            
            const titleSpan = document.createElement('span');
            titleSpan.className = 'ref-title';
            titleSpan.textContent = doc.title;
            wrapper.appendChild(titleSpan);
            
            // Badges row
            const badgesDiv = document.createElement('div');
            badgesDiv.className = 'ref-tags';
            
            // Document Type badge
            const docTypeBadge = document.createElement('span');
            const docType = doc.document_type || 'MOH_GUIDELINE';
            docTypeBadge.className = `doc-type-badge ${getBadgeClass(docType)}`;
            docTypeBadge.textContent = docType;
            badgesDiv.appendChild(docTypeBadge);
            
            // Tags badges
            if (doc.tags && Array.isArray(doc.tags)) {
                doc.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'ref-tag';
                    tagSpan.textContent = tag;
                    badgesDiv.appendChild(tagSpan);
                });
            }
            
            wrapper.appendChild(badgesDiv);
            tdTitle.appendChild(wrapper);
            tr.appendChild(tdTitle);
            
            // 3. Authority Column
            const tdAuth = document.createElement('td');
            tdAuth.className = 'authority-col';
            tdAuth.textContent = doc.issuing_authority || 'Bộ Y tế';
            tr.appendChild(tdAuth);
            
            // 4. Date Column
            const tdDate = document.createElement('td');
            tdDate.className = 'date-col';
            tdDate.textContent = doc.effective_date || 'N/A';
            tr.appendChild(tdDate);
            
            // 5. Download Button
            const tdAction = document.createElement('td');
            tdAction.style.textAlign = 'center';
            tdAction.appendChild(createActionButton(doc));
            tr.appendChild(tdAction);
            
            tbody.appendChild(tr);
        });
    }
    
    function getBadgeClass(type) {
        switch (type) {
            case 'LAW': return 'badge-law';
            case 'CIRCULAR': return 'badge-circular';
            case 'MOH_GUIDELINE':
            case 'DECISION':
                return 'badge-guideline';
            default: return 'badge-guideline';
        }
    }
    
    function createActionButton(doc) {
        const link = document.createElement('a');
        
        // Scenario 1: Local PDF exists
        if (doc.local_path && doc.local_path !== '') {
            link.href = doc.local_path;
            link.className = 'btn-action';
            link.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Tải PDF';
            link.target = '_blank';
        } 
        // Scenario 2: Online external direct PDF exists
        else if (doc.source_url && doc.source_url !== '') {
            link.href = doc.source_url;
            link.className = 'btn-action btn-online';
            link.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Xem online';
            link.target = '_blank';
        } 
        // Scenario 3: No link yet (Pending)
        else {
            link.className = 'btn-action btn-pending';
            link.innerHTML = '<i class="fa-solid fa-clock"></i> Chưa có link';
            link.removeAttribute('href');
            link.style.pointerEvents = 'none';
        }
        
        return link;
    }
    
    // 6. Search and Filtering Logic
    function filterData() {
        const query = searchInput.value.toLowerCase().trim();
        const typeFilter = filterDocType.value;
        const statusFilter = filterStatus.value;
        
        const filtered = documentsData.filter(doc => {
            // A. Search Query Match
            const matchesQuery = 
                doc.ref_id.toLowerCase().includes(query) ||
                doc.title.toLowerCase().includes(query) ||
                (doc.issuing_authority && doc.issuing_authority.toLowerCase().includes(query)) ||
                (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)));
                
            // B. Doc Type Filter Match
            const matchesType = typeFilter === 'all' || doc.document_type === typeFilter;
            
            // C. Status Filter Match
            let matchesStatus = true;
            if (statusFilter === 'local') {
                matchesStatus = doc.local_path && doc.local_path !== '';
            } else if (statusFilter === 'online') {
                matchesStatus = (!doc.local_path || doc.local_path === '') && doc.source_url && doc.source_url !== '';
            } else if (statusFilter === 'pending') {
                matchesStatus = (!doc.local_path || doc.local_path === '') && (!doc.source_url || doc.source_url === '');
            }
            
            // D. Tag Pill Filter Match
            const matchesTag = !selectedTag || (doc.tags && doc.tags.includes(selectedTag));
            
            return matchesQuery && matchesType && matchesStatus && matchesTag;
        });
        
        renderTable(filtered);
    }
    
    // Bind Search Input and Clear Button
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            searchClearBtn.style.display = 'block';
        } else {
            searchClearBtn.style.display = 'none';
        }
        filterData();
    });
    
    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        filterData();
        searchInput.focus();
    });
    
    filterDocType.addEventListener('change', filterData);
    filterStatus.addEventListener('change', filterData);
});

// 7. Clipboard copy logic
function copyText(elementId) {
    const textElement = document.getElementById(elementId);
    let text = textElement.textContent || textElement.innerText;
    
    // Replace placeholder <username> with current host or domain info if needed
    const currentOrigin = window.location.origin + window.location.pathname.replace(/\/$/, "");
    if (elementId === 'cdn-json-url') {
        text = `${currentOrigin}/library.json`;
    } else if (elementId === 'cdn-pdf-url') {
        text = `${currentOrigin}/raw_sources/<ref_id>.pdf`;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('toast');
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 2000);
    }).catch(err => {
        console.error('Lỗi khi sao chép:', err);
    });
}

// 8. Tab switching logic for code samples
function switchTab(event, tabId) {
    const tabs = document.querySelectorAll('.code-tab');
    const blocks = document.querySelectorAll('.code-block');
    
    tabs.forEach(t => t.classList.remove('active'));
    blocks.forEach(b => b.style.display = 'none');
    
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).style.display = 'block';
}
