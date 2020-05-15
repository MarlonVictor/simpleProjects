const form = document.querySelector('#form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const gender = getSelectedValue('gender');
    const age = getInputNumberValue('age');
    const weight = getInputNumberValue('weight');
    const height = getInputNumberValue('height');
    const activityLevel = getSelectedValue('activity_level');

    const tnb = Math.round(
        gender === 'fem'
         ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
         : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    );

    const maintenance = Math.round( tnb + Number(activityLevel));
    const loseWeight = maintenance - 450;
    const gainWeight = maintenance + 450;

    const layout = `
        <div class='content'>
            <h2>Aqui está o resultado:</h2>
            <ul>
                <li>
                    Seu metabolismo basal é de <strong>${tnb}</strong>.
                </li>
                <li>
                    Para manter o seu peso você precisa consumir em média <strong>${maintenance}</strong>.
                </li>
                <li>
                    Para perder peso você precisa consumir em média <strong>${loseWeight}</strong>.
                </li>
                <li>
                    Para ganhar peso você precisa consumir em média <strong>${gainWeight}</strong>.
                </li>
            </ul>
        </div>
        `

    const result = document.querySelector('#result');
    result.innerHTML = layout;
}

function getSelectedValue(id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
    return Number(document.getElementById(id).value);
}