RegisterNuiCallback('getTranslations', (data, cb) => {
    const resource = LoadResourceFile(GetCurrentResourceName(), 'lang.json');
    cb({ resp: JSON.parse(resource) });
});