USE magic;

/*
	INSERT INTO roles(name) VALUES ("student"),("instructor"), ("admin");
*/

/*
	INSERT INTO topics(name) VALUES ("python"),("javascript"), ("html");
*/

/*
	INSERT INTO user_topics(user_id, topic_id) VALUES (2, 4);
*/

/*
	INSERT INTO courses(name, description, thumbnail_url, slug, published_at) VALUES
		("Aprende css desde cero", "Esto es una descripción de CSS", "Oelo", "Oelo", NOW()),
        ("Aprende html desde cero", "Esto es una descripción de HTML", "Oelo", "Oelo", NOW()),
		("Aprende front", "Esto es una descripción de front", "Oelo", "Oelo", NOW()),
        ("Aprende analisis de datos", "Esto es una descripción de analisis", "Oelo", "Oelo", NOW());
*/

/*
INSERT INTO user_sections (course_sections_id, status, users_id) VALUES
    -- Sections for "Aprende front" (courses_id = 3)
    (6, 'UNINITIALIZED', 2),  -- Introducción
    (7, 'UNINITIALIZED', 2),  -- Que es el front - Sección

    -- Sections for "Aprende analisis de datos" (courses_id = 4)
    (8, 'UNINITIALIZED', 2),  -- Que es el análisis de datos - Sección
    (9, 'UNINITIALIZED', 2),  -- Machine learning
    (10, 'UNINITIALIZED', 2); -- Minando datos
*/

/*
INSERT INTO user_classes (status, users_id, section_classes_id, updated_at) VALUES
    -- Classes for "Introducción" (course_sections_id = 6)
    ('UNINITIALIZED', 2, 21, NOW()), -- Intro to Web Development
    ('UNINITIALIZED', 2, 22, NOW()), -- Front-end vs Back-end
    ('UNINITIALIZED', 2, 23, NOW()), -- Tools of the Trade
    ('UNINITIALIZED', 2, 24, NOW()), -- First Steps

    -- Classes for "Que es el front - Sección" (course_sections_id = 7)
    ('UNINITIALIZED', 2, 25, NOW()), -- Introduction to Front-end
    ('UNINITIALIZED', 2, 26, NOW()), -- HTML, CSS, and JavaScript
    ('UNINITIALIZED', 2, 27, NOW()), -- Front-end Frameworks
    ('UNINITIALIZED', 2, 28, NOW()), -- Building Front-end Projects

    -- Classes for "Que es el análisis de datos - Sección" (course_sections_id = 8)
    ('UNINITIALIZED', 2, 29, NOW()), -- Data Analysis Overview
    ('UNINITIALIZED', 2, 30, NOW()), -- Data Collection Techniques
    ('UNINITIALIZED', 2, 31, NOW()), -- Data Cleaning
    ('UNINITIALIZED', 2, 32, NOW()), -- Analyzing Data with Python

    -- Classes for "Machine learning" (course_sections_id = 9)
    ('UNINITIALIZED', 2, 33, NOW()), -- Intro to Machine Learning
    ('UNINITIALIZED', 2, 34, NOW()), -- Supervised Learning
    ('UNINITIALIZED', 2, 35, NOW()), -- Unsupervised Learning
    ('UNINITIALIZED', 2, 36, NOW()), -- Neural Networks

    -- Classes for "Minando datos" (course_sections_id = 10)
    ('UNINITIALIZED', 2, 37, NOW()), -- Data Mining Basics
    ('UNINITIALIZED', 2, 38, NOW()), -- Data Mining Algorithms
    ('UNINITIALIZED', 2, 39, NOW()), -- Text Mining
    ('UNINITIALIZED', 2, 40, NOW()); -- Data Mining with Python
*/

/*
	INSERT INTO course_topics(course_id, topic_id) VALUES (1, 1), (2, 5), (3, 1), (3, 5), (3, 4), (4,3);
*/

/*
	INSERT INTO user_courses(status, users_id, courses_id) VALUES ('UNINITIALLIZED', 2, 4), ('UNINITIALLIZED', 2, 3);
*/

/*
	INSERT INTO course_sections(name, courses_id) VALUES
		('Css grid', 1), 
        ('Css flex', 1),
        ('HTML semántica', 2),
        ('Tags', 2),
        ('Formularios', 2),
        ('Introducción', 3),
        ('Que es el front - Sección', 3),
        ('Que es el análisis de datos - Sección', 4),
        ('Machine learning', 4),
        ('Minando datos', 4);
*/

/*
INSERT INTO section_classes (title, content, duration, url, created_at, course_sections_id) VALUES
    -- Classes for 'Css grid' (course_sections_id = 1)
    ('Introduction to CSS Grid', 'Learn the basics of CSS Grid.', 15, 'http://example.com/css-grid-1', NOW(), 1),
    ('Grid Layouts', 'Understanding grid layouts and how to create them.', 20, 'http://example.com/css-grid-2', NOW(), 1),
    ('Responsive Grid', 'Building responsive layouts using CSS Grid.', 18, 'http://example.com/css-grid-3', NOW(), 1),
    ('Advanced Grid Techniques', 'Learn advanced techniques with CSS Grid.', 25, 'http://example.com/css-grid-4', NOW(), 1),
    
    -- Classes for 'Css flex' (course_sections_id = 1)
    ('Introduction to Flexbox', 'Learn how Flexbox works.', 12, 'http://example.com/css-flex-1', NOW(), 1),
    ('Aligning with Flexbox', 'Flexbox alignment and distribution properties.', 18, 'http://example.com/css-flex-2', NOW(), 1),
    ('Flexbox Layout Examples', 'Real-world examples using Flexbox.', 22, 'http://example.com/css-flex-3', NOW(), 1),
    ('Flexbox vs Grid', 'Comparing Flexbox and CSS Grid for layouts.', 16, 'http://example.com/css-flex-4', NOW(), 1),

    -- Classes for 'HTML semántica' (course_sections_id = 2)
    ('Introduction to Semantic HTML', 'Understand the importance of semantic HTML.', 14, 'http://example.com/html-semantica-1', NOW(), 2),
    ('HTML5 Semantic Tags', 'Learn the new semantic tags in HTML5.', 16, 'http://example.com/html-semantica-2', NOW(), 2),
    ('Best Practices', 'Semantic HTML best practices for accessibility.', 20, 'http://example.com/html-semantica-3', NOW(), 2),
    ('Building Semantic Websites', 'Creating a fully semantic website.', 22, 'http://example.com/html-semantica-4', NOW(), 2),

    -- Classes for 'Tags' (course_sections_id = 2)
    ('HTML Tags Overview', 'Introduction to HTML tags and their use.', 10, 'http://example.com/tags-1', NOW(), 2),
    ('Block vs Inline Tags', 'Understanding block and inline elements.', 12, 'http://example.com/tags-2', NOW(), 2),
    ('Form Tags', 'Learn the different form-related HTML tags.', 18, 'http://example.com/tags-3', NOW(), 2),
    ('Media Tags', 'Using HTML tags for multimedia.', 15, 'http://example.com/tags-4', NOW(), 2),

    -- Classes for 'Formularios' (course_sections_id = 2)
    ('Form Basics', 'Introduction to HTML forms.', 16, 'http://example.com/formularios-1', NOW(), 2),
    ('Form Input Types', 'Exploring various input types in forms.', 18, 'http://example.com/formularios-2', NOW(), 2),
    ('Form Validation', 'Client-side and server-side form validation.', 22, 'http://example.com/formularios-3', NOW(), 2),
    ('Advanced Forms', 'Building complex forms with multiple fields.', 24, 'http://example.com/formularios-4', NOW(), 2),

    -- Classes for 'Introducción' (course_sections_id = 3)
    ('Intro to Web Development', 'An overview of web development fundamentals.', 20, 'http://example.com/intro-1', NOW(), 3),
    ('Front-end vs Back-end', 'Differences between front-end and back-end.', 18, 'http://example.com/intro-2', NOW(), 3),
    ('Tools of the Trade', 'Tools and frameworks used in web development.', 22, 'http://example.com/intro-3', NOW(), 3),
    ('First Steps', 'Setting up your development environment.', 25, 'http://example.com/intro-4', NOW(), 3),

    -- Classes for 'Que es el front - Sección' (course_sections_id = 3)
    ('Introduction to Front-end', 'What is front-end development?', 14, 'http://example.com/front-1', NOW(), 3),
    ('HTML, CSS, and JavaScript', 'The core technologies of front-end development.', 20, 'http://example.com/front-2', NOW(), 3),
    ('Front-end Frameworks', 'Popular front-end frameworks like React and Angular.', 24, 'http://example.com/front-3', NOW(), 3),
    ('Building Front-end Projects', 'Developing small front-end projects.', 28, 'http://example.com/front-4', NOW(), 3),

    -- Classes for 'Que es el análisis de datos - Sección' (course_sections_id = 4)
    ('Data Analysis Overview', 'Introduction to data analysis concepts.', 15, 'http://example.com/data-analysis-1', NOW(), 4),
    ('Data Collection Techniques', 'Methods for collecting data.', 18, 'http://example.com/data-analysis-2', NOW(), 4),
    ('Data Cleaning', 'Cleaning and preparing data for analysis.', 20, 'http://example.com/data-analysis-3', NOW(), 4),
    ('Analyzing Data with Python', 'Using Python for data analysis.', 25, 'http://example.com/data-analysis-4', NOW(), 4),

    -- Classes for 'Machine learning' (course_sections_id = 4)
    ('Intro to Machine Learning', 'Basic concepts of machine learning.', 15, 'http://example.com/ml-1', NOW(), 4),
    ('Supervised Learning', 'Understanding supervised learning models.', 22, 'http://example.com/ml-2', NOW(), 4),
    ('Unsupervised Learning', 'Exploring unsupervised learning techniques.', 24, 'http://example.com/ml-3', NOW(), 4),
    ('Neural Networks', 'Introduction to neural networks.', 28, 'http://example.com/ml-4', NOW(), 4),

    -- Classes for 'Minando datos' (course_sections_id = 4)
    ('Data Mining Basics', 'Introduction to data mining techniques.', 18, 'http://example.com/data-mining-1', NOW(), 4),
    ('Data Mining Algorithms', 'Overview of popular data mining algorithms.', 20, 'http://example.com/data-mining-2', NOW(), 4),
    ('Text Mining', 'Text mining techniques and applications.', 22, 'http://example.com/data-mining-3', NOW(), 4),
    ('Data Mining with Python', 'Using Python for data mining tasks.', 25, 'http://example.com/data-mining-4', NOW(), 4);
*/


/*
SELECT * FROM course_topics;
SELECT * FROM roles;
SELECT * FROM user_topics;
*/
SELECT * FROM courses;
SELECT * FROM user_courses;
SELECT * FROM users;
SELECT * FROM course_sections;
SELECT * FROM section_classes;
SELECT * FROM user_sections;
SELECT * FROM user_classes;
