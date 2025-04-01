// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show loader for 2 seconds then reveal content
    setTimeout(function() {
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2000);

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Changing title animation
    const titles = ['Frontend Developer', 'UI/UX Designer', 'React Developer', 'Full Stack Developer'];
    let titleIndex = 0;
    const changingTitle = document.querySelector('.changing-title');
    
    setInterval(function() {
        changingTitle.style.opacity = '0';
        
        setTimeout(function() {
            titleIndex = (titleIndex + 1) % titles.length;
            changingTitle.textContent = titles[titleIndex];
            changingTitle.style.opacity = '1';
        }, 500);
    }, 3000);

    // 3D Globe using Three.js
    const globeContainer = document.getElementById('globe-canvas');
    if (globeContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / globeContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        renderer.setClearColor(0x000000, 0);
        globeContainer.appendChild(renderer.domElement);
        
        // Create a globe
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'),
            bumpMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_normal_2048.jpg'),
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_specular_2048.jpg'),
            specular: new THREE.Color('grey')
        });
        
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        camera.position.z = 10;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.005;
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = globeContainer.clientWidth / globeContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        });
    }
    
    // 3D Tech Stack visualization
    const techStackContainer = document.getElementById('tech-stack-3d');
    if (techStackContainer) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, techStackContainer.clientWidth / techStackContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(techStackContainer.clientWidth, techStackContainer.clientHeight);
        renderer.setClearColor(0x000000, 0);
        techStackContainer.appendChild(renderer.domElement);
        
        // Create floating tech icons
        const technologies = [
            { name: 'HTML', color: 0xE44D26 },
            { name: 'CSS', color: 0x1572B6 },
            { name: 'JS', color: 0xF7DF1E },
            { name: 'React', color: 0x61DAFB },
            { name: 'Node', color: 0x68A063 },
            { name: 'Mongo', color: 0x4DB33D }
        ];
        
        const techObjects = [];
        
        technologies.forEach((tech, index) => {
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshPhongMaterial({ color: tech.color });
            const cube = new THREE.Mesh(geometry, material);
            
            // Position in a circle
            const angle = (index / technologies.length) * Math.PI * 2;
            const radius = 4;
            cube.position.x = Math.cos(angle) * radius;
            cube.position.y = Math.sin(angle) * radius;
            cube.position.z = 0;
            
            scene.add(cube);
            techObjects.push({
                mesh: cube,
                rotationSpeed: 0.01 + (Math.random() * 0.01),
                floatSpeed: 0.005 + (Math.random() * 0.005),
                floatAmplitude: 0.5,
                floatOffset: Math.random() * Math.PI * 2
            });
        });
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        camera.position.z = 10;
        
        // Animation loop
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.01;
            
            techObjects.forEach((obj, index) => {
                obj.mesh.rotation.x += obj.rotationSpeed;
                obj.mesh.rotation.y += obj.rotationSpeed;
                obj.mesh.position.y = Math.sin(time + obj.floatOffset) * obj.floatAmplitude + Math.sin(index / technologies.length * Math.PI * 2) * 4;
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = techStackContainer.clientWidth / techStackContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(techStackContainer.clientWidth, techStackContainer.clientHeight);
        });
    }
    
    // Chatbot functionality
    createChatbot();
});

// Create and initialize chatbot
function createChatbot() {
    // Create chatbot HTML structure
    const chatbotHTML = `
        <div id="chatbot" class="chatbot">
            <div class="chat-header">
                <div class="chat-title">Need help?</div>
                <div class="chat-controls">
                    <button id="minimize-chat" class="control-btn"><i class="fas fa-minus"></i></button>
                    <button id="close-chat" class="control-btn"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="chat-body">
                <div class="chat-messages">
                    <div class="message bot">
                        Hi there! 👋 I'm Kamsy's assistant. How can I help you today?
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your message...">
                    <button id="send-message"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        <button id="open-chat" class="chat-trigger">
            <i class="fas fa-comment"></i>
        </button>
    `;
    
    // Insert chatbot into the DOM
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
    
    // Add chatbot styles
    const chatbotStyles = document.createElement('style');
    chatbotStyles.textContent = `
        .chatbot {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 320px;
            height: 400px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            z-index: 9999;
            display: none;
        }
        
        .chat-header {
            background: linear-gradient(135deg, #3498db, #1a237e);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
        }
        
        .chat-controls {
            display: flex;
        }
        
        .control-btn {
            background: none;
            border: none;
            color: white;
            margin-left: 10px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .chat-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 15px;
            overflow: hidden;
        }
        
        .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding-right: 5px;
        }
        
        .message {
            margin-bottom: 10px;
            padding: 10px 12px;
            border-radius: 18px;
            max-width: 80%;
            word-wrap: break-word;
        }
        
        .message.bot {
            background-color: #f1f0f0;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }
        
        .message.user {
            background-color: #1a237e;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
            margin-left: auto;
        }
        
        .chat-input-area {
            display: flex;
            margin-top: 10px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        
        #chat-input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
        }
        
        #send-message {
            background-color: #1a237e;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chat-trigger {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1a237e;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 9998;
        }
        
        /* Hamburger menu styles */
        .hamburger {
            display: none;
            cursor: pointer;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 20px;
        }
        
        .hamburger div {
            height: 3px;
            width: 100%;
            background-color: #333;
            transition: all 0.3s ease;
        }
        
        .hamburger.active div:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active div:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active div:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background-color: white;
                flex-direction: column;
                padding: 20px;
                transition: all 0.5s ease;
                z-index: 1000;
            }
            
            .nav-links.active {
                left: 0;
            }
            
            .nav-links li {
                margin: 15px 0;
            }
        }
    `;
    
    document.head.appendChild(chatbotStyles);
    
    // Chat functionality
    const chatbot = document.getElementById('chatbot');
    const openChatBtn = document.getElementById('open-chat');
    const closeChatBtn = document.getElementById('close-chat');
    const minimizeChatBtn = document.getElementById('minimize-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Open chat
    openChatBtn.addEventListener('click', function() {
        chatbot.style.display = 'flex';
        openChatBtn.style.display = 'none';
    });
    
    // Close chat
    closeChatBtn.addEventListener('click', function() {
        chatbot.style.display = 'none';
        openChatBtn.style.display = 'flex';
    });
    
    // Minimize chat
    minimizeChatBtn.addEventListener('click', function() {
        chatbot.style.display = 'none';
        openChatBtn.style.display = 'flex';
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const responses = [
                    "Thanks for your message! I'll have Kamsy get back to you soon.",
                    "I'd be happy to help with that! Could you provide more details?",
                    "That's an interesting question about web development.",
                    "Kamsy has experience with that technology. Would you like to see some examples?",
                    "I can help schedule a meeting with Kamsy to discuss your project.",
                    "That sounds like an exciting project! What's your timeline?",
                    "Would you like to see Kamsy's portfolio related to that topic?",
                    "I'll make sure Kamsy knows about your interest. What's the best way to contact you?"
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000);
        }
    }
    
    sendMessageBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
    // CV Popup Functionality
    const cvButtons = document.querySelectorAll('#cv-btn, #cv-btn2, #cv-btn3');
    const cvPopup = document.getElementById('cv-popup');
    const closeCV = document.getElementById('close-cv');
    
    cvButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cvPopup.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeCV.addEventListener('click', function() {
        cvPopup.classList.remove('show');
        document.body.style.overflow = 'auto';
    });