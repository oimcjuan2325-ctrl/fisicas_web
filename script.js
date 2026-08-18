// --- CONFIGURACIÓN ---
const API_KEY = "AQ.Ab8RN6LoGm-YNR68PPuTC54lAsK8ZQHVqD7wzQMHmmKMBv1NoQ"; // <--- PEGA TU KEY AQUÍ

// --- INICIALIZAR GEOGEBRA (2D y 3D) ---
var params = {
    "appName": "classic", 
    "width": "100%", 
    "height": "100%", 
    "showToolBar": true, 
    "showAlgebraInput": true,
    "showMenuBar": true
};
var applet = new GGBApplet(params, true);
window.onload = function() { 
    applet.inject('ggb-container'); 
}

// --- LÓGICA DE IA Y CHAT ---
const input = document.getElementById('userInput');
const chatBox = document.getElementById('chat-box');

input.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        const prompt = input.value.trim();
        if (!prompt) return;
        
        chatBox.innerHTML += `<p><b>Tú:</b> ${prompt}</p>";
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        try {
            const comando = await obtenerComandoDeIA(prompt);
            // Ejecutar el comando directamente en el entorno de GeoGebra
            ggbApplet.evalCommand(comando);
            chatBox.innerHTML += `<p style="color: #38bdf8;"><b>IA:</b> He ejecutado: <code>${comando}</code></p>`;
        } catch (err) {
            chatBox.innerHTML += `<p style="color: #f87171;">Error conectando con la IA.</p>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

async function obtenerComandoDeIA(texto) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const systemPrompt = `Eres un experto en GeoGebra. El usuario te pedirá crear formas geométricas o funciones. 
    Devuelve ÚNICAMENTE el comando de GeoGebra válido en texto plano. No pongas explicaciones ni etiquetas de código markdown (como \`\`\`). 
    Ejemplo: 'parábola' -> 'f(x)=x^2', 'círculo radio 3' -> 'Circle((0,0),3)'.`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt + " Usuario: " + texto }] }] })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
}
