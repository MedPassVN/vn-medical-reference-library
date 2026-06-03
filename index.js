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
    document.getElementById('cdn-pdf-url').value = `${currentOrigin}/raw_sources/<ref_id>.pdf`;

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
        const downloaded = data.filter(doc => doc.local_path && doc.local_path !== '').length;
        const pending = data.filter(doc => (!doc.local_path || doc.local_path === '') && (!doc.source_url || doc.source_url === '')).length;
        
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
            tdId.innerHTML = `<code>${doc.ref_id}</code>`;
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
            typeSpan.textContent = doc.document_type;
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
            tdAuth.textContent = doc.issuing_authority || 'Bộ Y tế';
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
        link.target = '_blank';

        if (doc.local_path && doc.local_path !== '') {
            link.href = doc.local_path;
            link.className = 'btn-download';
            link.textContent = 'Tải PDF';
        } else if (doc.source_url && doc.source_url !== '') {
            link.href = doc.source_url;
            link.className = 'btn-download btn-online';
            link.textContent = 'Xem online';
        } else {
            link.className = 'btn-download btn-pending';
            link.textContent = 'Chưa có link';
            link.removeAttribute('href');
            link.style.pointerEvents = 'none';
        }
        return link;
    }

    // Filtering Logic
    function filterData() {
        const query = searchInput.value.toLowerCase().trim();
        const typeFilter = filterDocType.value;
        const statusFilter = filterStatus.value;

        const filtered = documentsData.filter(doc => {
            const matchesQuery = 
                doc.ref_id.toLowerCase().includes(query) ||
                doc.title.toLowerCase().includes(query) ||
                (doc.issuing_authority && doc.issuing_authority.toLowerCase().includes(query)) ||
                (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(query)));
                
            const matchesType = typeFilter === 'all' || doc.document_type === typeFilter;
            
            let matchesStatus = true;
            if (statusFilter === 'local') {
                matchesStatus = doc.local_path && doc.local_path !== '';
            } else if (statusFilter === 'online') {
                matchesStatus = (!doc.local_path || doc.local_path === '') && doc.source_url && doc.source_url !== '';
            } else if (statusFilter === 'pending') {
                matchesStatus = (!doc.local_path || doc.local_path === '') && (!doc.source_url || doc.source_url === '');
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
