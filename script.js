// Añade esto al principio de tu script.js
const API_KEY = "AQ.Ab8RN6LoGm-YNR68PPuTC54lAsK8ZQHVqD7wzQMHmmKMBv1NoQ"; 

async function consultarIA(pregunta, datosGeometricos) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const prompt = `Actúa como un profesor de mates experto. El usuario tiene un triángulo con puntos A(${datosGeometricos.p1}), B(${datosGeometricos.p2}), C(${datosGeometricos.p3}). El usuario pregunta: "${pregunta}". Responde de forma pedagógica y breve.`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Actualiza tu evento 'keypress'
input.addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        const msg = input.value;
        chatBox.innerHTML += `<p><b>Tú:</b> ${msg}</p>`;
        
        // Obtener datos del plano
        const datos = {
            p1: [p1.X().toFixed(1), p1.Y().toFixed(1)],
            p2: [p2.X().toFixed(1), p2.Y().toFixed(1)],
            p3: [p3.X().toFixed(1), p3.Y().toFixed(1)]
        };

        const respuesta = await consultarIA(msg, datos);
        chatBox.innerHTML += `<p class="ia-msg" style="color: #38bdf8;"><b>GeoSmart IA:</b> ${respuesta}</p>`;
        input.value = '';
    }
});
