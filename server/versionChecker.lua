Citizen.CreateThread(function()
    while true do
        PerformHttpRequest('https://raw.githubusercontent.com/oakyydev/validator/master/version.txt', function(errorCode, resultData, resultHeaders, errorData)
            local currentVersion = GetResourceMetadata(GetCurrentResourceName(), 'version', 0)
            local newVersion = tostring(resultData)
            
            if currentVersion <= newVersion then
                print('^3[Validator]: A new version is available. New version: ['..newVersion..'] Current Version: ['..currentVersion..'] Download: https://github.com/oakyydev/validator^7')
            end
        end)
        Citizen.Wait(1000 * 60 * 30)
    end
end)