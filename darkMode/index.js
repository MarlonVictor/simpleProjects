const html = document.querySelector('html');
const changeLogo = document.getElementById('logo');
const changeButton = document.querySelector('#dm_button');
const checkbox = document.querySelector('input[name=theme]');

    const getStyle = (element, style) =>
        window
            .getComputedStyle(element)
            .getPropertyValue(style)

    const themePadrao = {
        bgPrincipal: getStyle(html, '--bgPrincipal'),
        bgSecundaria: getStyle(html, '--bgSecundaria'),
        bgLogo: getStyle(html, '--bgLogo'),
        bgButton: getStyle(html, '--bgButton'),
        colorText: getStyle(html, '--colorText')
    } 

    const darkMode = {
        bgPrincipal: '#000A16', 
        bgSecundaria: '#112A47', 
        bgLogo: 'url(img/logowhite.png)',
        bgButton: 'url(https://image.flaticon.com/icons/svg/979/979585.svg)',
        colorText: '#fff'
    }

    transformKey = key => "--" + key

    const changeColors = (colors) => {
        Object.keys(colors).map(key =>
            html.style.setProperty(transformKey(key), colors[key])
        )
    }

    checkbox.addEventListener('change', ({target}) => {
        target.checked ? changeColors(darkMode) : changeColors(themePadrao)
    })