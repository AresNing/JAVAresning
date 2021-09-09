(function () {
    param = {
        count: {
            countable: true,
            position: 'top',
            margin: '10px',
            float: 'right',
            fontsize:'0.9em',
            color:'rgb(90,90,90)',
            language:'chinese', // english or chinese
            localization: {
                words: "",
                minute: ""
            },
            isExpected: true
        },
    };
    $docsify = Object.assign(param, $docsify);
})();