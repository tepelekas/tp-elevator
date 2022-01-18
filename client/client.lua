RegisterNUICallback("close", function(data, cb)
    SendNUIMessage({
        type = "ui",
        display = false
    })

    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback("teleport", function(data, cb)
    DoScreenFadeOut(1200)

    while not IsScreenFadedOut() do
        Citizen.Wait(10)
    end

    DoScreenFadeIn(1200)

    local ped = PlayerPedId()
    SetEntityCoords(ped, data.position.x, data.position.y, data.position.z)
    SetEntityHeading(ped, data.heading)

    cb('ok')
end)

CreateThread(function()
    for elevator, floors in pairs(Config.Elevators) do
        for floor, data in pairs(floors) do
            Wait(5)
            SendNUIMessage({
                type = 'tick',
                table = json.encode(floors),
                floor_name = json.encode(data.floor_name),
                name = elevator
            })
        end
    end
end)

CreateThread(function()
    while true do
        local player = PlayerPedId()
        local PlayerLocation = GetEntityCoords(player)

        for elevator, floors in pairs(Config.Elevators) do
            for floor, data in pairs(floors) do
                local distance = #(PlayerLocation - Config.Elevators[elevator][floor].position)
                if distance < 1.0 then
                    DrawText3D(Config.Elevators[elevator][floor].position.x, Config.Elevators[elevator][floor].position.y, Config.Elevators[elevator][floor].position.z + 0.20, "~r~[E]~w~ to open the elevator menu")
                    if IsControlJustReleased(1, 38) then
                        SetNuiFocus(true, true)
                        SendNUIMessage({
                            type = 'ui',
                            display = true,
                            current_position_z = data.position.z,
                        })
                    end
                else
                end
            end
        end
        Wait(4)
    end
end)

function DrawText3D(x, y, z, text)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    SetDrawOrigin(x,y,z, 0)
    DrawText(0.0, 0.0)
    local factor = (string.len(text)) / 370
    DrawRect(0.0, 0.0+0.0125, 0.017+ factor, 0.03, 0, 0, 0, 75)
    ClearDrawOrigin()
end