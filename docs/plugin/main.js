(function () {
    isMobile = document.body.clientWidth <= 600;
    param = {
        name: "JAVAresning",
        repo: "https://github.com/AresNing/JAVAresning/",
        notFoundPage: true,
        loadSidebar: true,
        loadNavbar: !isMobile, // 适配手机
        subMaxLevel: 4,
        alias: {
            "/.*/_sidebar.md": "/_sidebar.md",
            "/.*/_navbar.md": "/_navbar.md",
        },
        auto2top: true,
        relativePath: false,
        formatUpdated: "{YYYY}/{MM}/{DD} {HH}:{mm}",
    };
    $docsify = Object.assign(param, $docsify);
})();
