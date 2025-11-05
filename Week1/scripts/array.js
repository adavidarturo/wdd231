const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML','CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML','CSS','JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        technology: ['HTML','CSS','JavaScript'],
        completed: false
    }
];

/* Render courses into DOM */
function renderCourses(filter = 'ALL') {
    const list = document.getElementById('course-list');
    const creditsNode = document.getElementById('credits-number');
    if (!list) return;

    let displayed = courses.slice();
    if (filter === 'CSE') displayed = displayed.filter(c => c.subject === 'CSE');
    if (filter === 'WDD') displayed = displayed.filter(c => c.subject === 'WDD');

    list.innerHTML = '';

    displayed.forEach(course => {
        const li = document.createElement('li');
        li.className = course.completed ? 'completed' : 'incomplete';

        // status marker (check or x) + course text
        const status = document.createElement('span');
        status.className = 'status';
        status.setAttribute('aria-hidden', 'true');
        status.textContent = course.completed ? ' ✓ ' : ' ✕ ';
        li.appendChild(status);

        const title = document.createElement('strong');
        title.innerHTML = `${course.subject} ${course.number} — ${course.title}`;
        li.appendChild(title);

        const meta = document.createElement('div');
        meta.className = 'course-meta';
        meta.textContent = `${course.credits} credits`;
        li.appendChild(meta);

        list.appendChild(li);
    });

    const total = displayed.reduce((sum, c) => sum + c.credits, 0);
    if (creditsNode) creditsNode.textContent = total;
}

/* Initiate filters */
function initCourseFilters() {
    const btnAll = document.getElementById('btn-all');
    const btnCse = document.getElementById('btn-cse');
    const btnWdd = document.getElementById('btn-wdd');
    const buttons = [btnAll, btnCse, btnWdd];

    function setActive(btn) {
        buttons.forEach(b => b && b.classList.remove('active'));
        if (btn) btn.classList.add('active');
    }

    if (btnAll) btnAll.addEventListener('click', () => { setActive(btnAll); renderCourses('ALL'); });
    if (btnCse) btnCse.addEventListener('click', () => { setActive(btnCse); renderCourses('CSE'); });
    if (btnWdd) btnWdd.addEventListener('click', () => { setActive(btnWdd); renderCourses('WDD'); });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCourses('ALL');
    initCourseFilters();
});





