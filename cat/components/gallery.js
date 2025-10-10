let posts = [];
let currentDetailId = null;

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('postForm').addEventListener('submit', handleSubmit);
    document.getElementById('image').addEventListener('change', handleImageChange);
    showGallery();
});

function showForm() {
    document.getElementById('formContainer').classList.add('active');
    document.getElementById('galleryContainer').classList.remove('active');
    document.getElementById('detailContainer').classList.remove('active');
    document.getElementById('postForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
}

function cancelForm() {
    document.getElementById('formContainer').classList.remove('active');
    document.getElementById('galleryContainer').classList.add('active');
    document.getElementById('postForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
}

function showGallery() {
    document.getElementById('formContainer').classList.remove('active');
    document.getElementById('galleryContainer').classList.add('active');
    document.getElementById('detailContainer').classList.remove('active');
    renderGallery();
}

function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('imagePreview');
            preview.src = event.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function handleSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const content = document.getElementById('content').value.trim();
    const imageElement = document.getElementById('imagePreview');

    if (!title || !author || !content) {
        alert('제목, 작성자, 내용은 필수입니다.');
        return;
    }

    const post = {
        id: Date.now(),
        title: title,
        author: author,
        content: content,
        image: imageElement.style.display !== 'none' ? imageElement.src : null,
        date: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
    };

    posts.unshift(post);

    document.getElementById('postForm').reset();
    document.getElementById('imagePreview').style.display = 'none';

    showGallery();
}

function renderGallery() {
    const tbody = document.getElementById('tableBody');
    const emptyMessage = document.getElementById('emptyMessage');

    tbody.innerHTML = '';

    if (posts.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    posts.forEach((post, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${posts.length - index}</td>
            <td><a class="post-title" onclick="showDetail(${post.id})" style="cursor: pointer;">${post.title}</a></td>
            <td>${post.author}</td>
            <td>${post.date}</td>
        `;
        tbody.appendChild(row);
    });
}

function showDetail(id) {
    const post = posts.find(p => p.id === id);
    if (!post) {
        alert('글을 찾을 수 없습니다.');
        return;
    }

    currentDetailId = id;

    document.getElementById('formContainer').classList.remove('active');
    document.getElementById('galleryContainer').classList.remove('active');
    document.getElementById('detailContainer').classList.add('active');

    document.getElementById('detailTitle').textContent = post.title;
    document.getElementById('detailAuthor').textContent = post.author;
    document.getElementById('detailDate').textContent = post.date;
    document.getElementById('detailContent').textContent = post.content;

    const detailImage = document.getElementById('detailImage');
    if (post.image) {
        detailImage.src = post.image;
        detailImage.style.display = 'block';
    } else {
        detailImage.style.display = 'none';
    }

    window.scrollTo(0, 0);
}

function deletePost() {
    if (confirm('정말 삭제하시겠습니까?')) {
        posts = posts.filter(p => p.id !== currentDetailId);
        showGallery();
    }
}