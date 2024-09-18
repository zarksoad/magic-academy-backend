USE magic;

/*
	INSERT INTO topics(name) VALUES ("python"),("javascript"), ("html");

	INSERT INTO courses(name, description, thumbnail_url, slug, published_at) VALUES
		("Aprende css desde cero", "Esto es una descripción de CSS", "Oelo", "Oelo", NOW()),
        ("Aprende html desde cero", "Esto es una descripción de HTML", "Oelo", "Oelo", NOW()),
		("Aprende front", "Esto es una descripción de front", "Oelo", "Oelo", NOW()),
        ("Aprende analisis de datos", "Esto es una descripción de analisis", "Oelo", "Oelo", NOW());

	INSERT INTO user_courses(status, users_id, courses_id) VALUES ('UNINITIALLIZED', 2, 4), ('UNINITIALLIZED', 2, 3);
	
	INSERT INTO course_topics(course_id, topic_id) VALUES (1, 1), (2, 5), (3, 1), (3, 5), (3, 4), (4,3);
    
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

INSERT INTO user_sections (course_sections_id, status, users_id) VALUES
    -- Sections for "Aprende front" (courses_id = 3)
    (6, 'UNINITIALIZED', 2),  -- Introducción
    (7, 'UNINITIALIZED', 2),  -- Que es el front - Sección

    -- Sections for "Aprende analisis de datos" (courses_id = 4)
    (8, 'UNINITIALIZED', 2),  -- Que es el análisis de datos - Sección
    (9, 'UNINITIALIZED', 2),  -- Machine learning
    (10, 'UNINITIALIZED', 2); -- Minando datos

INSERT INTO section_classes (title, content, duration, url, created_at, course_sections_id) VALUES
    -- Classes for 'Css grid' (course_sections_id = 1)
    ('Introduction to CSS Grid', 'Learn the basics of CSS Grid.', 15, 'http://example.com/css-grid-1', NOW(), 1),
    ('Grid Layouts', 'Understanding grid layouts and how to create them.', 20, 'http://example.com/css-grid-2', NOW(), 1),
    ('Responsive Grid', 'Building responsive layouts using CSS Grid.', 18, 'http://example.com/css-grid-3', NOW(), 1),
    ('Advanced Grid Techniques', 'Learn advanced techniques with CSS Grid.', 25, 'http://example.com/css-grid-4', NOW(), 1),
    
    -- Classes for 'Css flex' (course_sections_id = 2)
    ('Introduction to Flexbox', 'Learn how Flexbox works.', 12, 'http://example.com/css-flex-1', NOW(), 2),
    ('Aligning with Flexbox', 'Flexbox alignment and distribution properties.', 18, 'http://example.com/css-flex-2', NOW(), 2),
    ('Flexbox Layout Examples', 'Real-world examples using Flexbox.', 22, 'http://example.com/css-flex-3', NOW(), 2),
    ('Flexbox vs Grid', 'Comparing Flexbox and CSS Grid for layouts.', 16, 'http://example.com/css-flex-4', NOW(), 2),

    -- Classes for 'HTML semántica' (course_sections_id = 3)
    ('Introduction to Semantic HTML', 'Understand the importance of semantic HTML.', 14, 'http://example.com/html-semantica-1', NOW(), 3),
    ('HTML5 Semantic Tags', 'Learn the new semantic tags in HTML5.', 16, 'http://example.com/html-semantica-2', NOW(), 3),
    ('Best Practices', 'Semantic HTML best practices for accessibility.', 20, 'http://example.com/html-semantica-3', NOW(), 3),
    ('Building Semantic Websites', 'Creating a fully semantic website.', 22, 'http://example.com/html-semantica-4', NOW(), 3),

    -- Classes for 'Tags' (course_sections_id = 4)
    ('HTML Tags Overview', 'Introduction to HTML tags and their use.', 10, 'http://example.com/tags-1', NOW(), 4),
    ('Block vs Inline Tags', 'Understanding block and inline elements.', 12, 'http://example.com/tags-2', NOW(), 4),
    ('Form Tags', 'Learn the different form-related HTML tags.', 18, 'http://example.com/tags-3', NOW(), 4),
    ('Media Tags', 'Using HTML tags for multimedia.', 15, 'http://example.com/tags-4', NOW(), 4),

    -- Classes for 'Formularios' (course_sections_id = 5)
    ('Form Basics', 'Introduction to HTML forms.', 16, 'http://example.com/formularios-1', NOW(), 5),
    ('Form Input Types', 'Exploring various input types in forms.', 18, 'http://example.com/formularios-2', NOW(), 5),
    ('Form Validation', 'Client-side and server-side form validation.', 22, 'http://example.com/formularios-3', NOW(), 5),
    ('Advanced Forms', 'Building complex forms with multiple fields.', 24, 'http://example.com/formularios-4', NOW(), 5),

    -- Classes for 'Introducción' (course_sections_id = 6)
    ('Intro to Web Development', 'An overview of web development fundamentals.', 20, 'http://example.com/intro-1', NOW(), 6),
    ('Front-end vs Back-end', 'Differences between front-end and back-end.', 18, 'http://example.com/intro-2', NOW(), 6),
    ('Tools of the Trade', 'Tools and frameworks used in web development.', 22, 'http://example.com/intro-3', NOW(), 6),
    ('First Steps', 'Setting up your development environment.', 25, 'http://example.com/intro-4', NOW(), 6),

    -- Classes for 'Que es el front - Sección' (course_sections_id = 7)
    ('Introduction to Front-end', 'What is front-end development?', 14, 'http://example.com/front-1', NOW(), 7),
    ('HTML, CSS, and JavaScript', 'The core technologies of front-end development.', 20, 'http://example.com/front-2', NOW(), 7),
    ('Front-end Frameworks', 'Popular front-end frameworks like React and Angular.', 24, 'http://example.com/front-3', NOW(), 7),
    ('Building Front-end Projects', 'Developing small front-end projects.', 28, 'http://example.com/front-4', NOW(), 7),

    -- Classes for 'Que es el análisis de datos - Sección' (course_sections_id = 8)
    ('Data Analysis Overview', 'Introduction to data analysis concepts.', 15, 'http://example.com/data-analysis-1', NOW(), 8),
    ('Data Collection Techniques', 'Methods for collecting data.', 18, 'http://example.com/data-analysis-2', NOW(), 8),
    ('Data Cleaning', 'Cleaning and preparing data for analysis.', 20, 'http://example.com/data-analysis-3', NOW(), 8),
    ('Analyzing Data with Python', 'Using Python for data analysis.', 25, 'http://example.com/data-analysis-4', NOW(), 8),

    -- Classes for 'Machine learning' (course_sections_id = 9)
    ('Intro to Machine Learning', 'Basic concepts of machine learning.', 15, 'http://example.com/ml-1', NOW(), 9),
    ('Supervised Learning', 'Understanding supervised learning models.', 22, 'http://example.com/ml-2', NOW(), 9),
    ('Unsupervised Learning', 'Exploring unsupervised learning techniques.', 24, 'http://example.com/ml-3', NOW(), 9),
    ('Neural Networks', 'Introduction to neural networks.', 28, 'http://example.com/ml-4', NOW(), 9),

    -- Classes for 'Minando datos' (course_sections_id = 10)
    ('Data Mining Basics', 'Introduction to data mining techniques.', 18, 'http://example.com/data-mining-1', NOW(), 10),
    ('Data Mining Algorithms', 'Overview of popular data mining algorithms.', 20, 'http://example.com/data-mining-2', NOW(), 10),
    ('Text Mining', 'Text mining techniques and applications.', 22, 'http://example.com/data-mining-3', NOW(), 10),
    ('Data Mining with Python', 'Using Python for data mining tasks.', 25, 'http://example.com/data-mining-4', NOW(), 10);
|
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

To randomly update the table "user_classes"
 
	UPDATE user_classes
	SET 
		status = 'IN PROGRESS',
		updated_at = (
			-- Generate a random date in the current year (2024)
			DATE_ADD('2024-01-01', INTERVAL FLOOR(RAND() * 365) DAY)
		)
	WHERE id IN (
		-- Select 2 random user_classes per course_section (course_sections_id)
		SELECT id FROM (
			SELECT uc.id 
			FROM user_classes uc
			INNER JOIN section_classes sc ON uc.section_classes_id = sc.id
			INNER JOIN course_sections cs ON sc.course_sections_id = cs.id
			WHERE uc.status = 'UNINITIALIZED'
			GROUP BY cs.id, uc.id
			ORDER BY cs.id, RAND() 
			LIMIT 15
		) as selected_classes
	);
*/


/*
SELECT * FROM course_topics;
SELECT * FROM roles;
SELECT * FROM user_topics;
SELECT * FROM topics;
SELECT * FROM courses;
SELECT * FROM user_courses;
SELECT * FROM user_sections;
SELECT * FROM user_classes;
SELECT * FROM users;
SELECT * FROM course_sections;
SELECT * FROM section_classes;

SELECT
	uc.users_id,
    uc.status AS user_class_status,
    uc.updated_at AS user_class_updated_at,
    sc.id AS section_class_id,
    sc.title AS section_class_title,
    cs.name AS course_section_name,
    cs.id AS course_section_id,
    c.name AS course_name,
    c.description AS course_description,
    c.id AS course_id
FROM 
    user_classes uc
INNER JOIN 
    section_classes sc ON uc.section_classes_id = sc.id
INNER JOIN 
    course_sections cs ON sc.course_sections_id = cs.id
INNER JOIN 
    courses c ON cs.courses_id = c.id
WHERE uc.users_id = 2 AND uc.status = 'IN PROGRESS';

SELECT
	uc.users_id,
    uc.status AS user_class_status,
    uc.updated_at AS user_class_updated_at,
    sc.title AS section_class_title,
    cs.name AS course_section_name,
    c.name AS course_name,
    c.description AS course_description
FROM 
    user_classes uc
INNER JOIN 
    section_classes sc ON uc.section_classes_id = sc.id
INNER JOIN 
    course_sections cs ON sc.course_sections_id = cs.id
INNER JOIN 
    courses c ON cs.courses_id = c.id
WHERE uc.users_id = 2
    AND uc.updated_at IN (
        SELECT 
            MAX(uc2.updated_at)
        FROM 
            user_classes uc2
        INNER JOIN 
            section_classes sc2 ON uc2.section_classes_id = sc2.id
        INNER JOIN 
            course_sections cs2 ON sc2.course_sections_id = cs2.id
        INNER JOIN 
            courses c2 ON cs2.courses_id = c2.id
        GROUP BY c2.id
    );



*/
