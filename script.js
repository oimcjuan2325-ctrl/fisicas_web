// 1. Inicializar el plano (JSXGraph)
const board = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-6, 6, 6, -6], axis: true, showCopyright: false 
});

// Crear un triángulo dinámico
const p1 = board.create('point', [-2, -2], {name: 'A', size: 4});
const p2 = board.create('point', [2, -2], {name: 'B', size: 4});
const p3 = board.create('point', [0, 2], {name: 'C', size: 4});
const tri = board.create('polygon', [p1, p2, p3]);

// 2. Lógica del Chat
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const msg = input.value;
        chatBox.innerHTML += `<p><b>Tú:</b> ${msg}</p>`;
        
        // Simulación de "IA" (Puedes conectar esto con una API real)
        const area = JXG.Math.Geometry.polyArea([p1.X(), p2.X(), p3.X()], [p1.Y(), p2.Y(), p3.Y()]);
        
        let response = `Interesante figura. Basado en los puntos actuales, el área aproximada es ${area.toFixed(2)} unidades cuadradas. `;
        response += "¿Quieres que te ayude a calcular la longitud de un lado?";
        
        chatBox.innerHTML += `<p class="ia-msg" style="color: #38bdf8;"><b>GeoSmart IA:</b> ${response}</p>`;
        input.value = '';
    }
});
