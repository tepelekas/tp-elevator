# tp-elevators
Advanced and Good looking UI Elevator Script

## Features
- Automatic elevator floor button add / remove
- Fully configurable
- You can add up to 7 floor whenever you want
- The floor limit is 3 down floors 3 up floors and 1 ground floor

## Installation
### Manual
- Download the script and put it in the `resources` directory.
- Add the following code to your server.cfg / resouces.cfg
```
ensure tp-elevators
```

## Configuration
```

Config = {}

Config.Elevators = {
    ['ambulance'] = { -- Elevator name [you can put what ever you like to remember what elevator it is]
        floor_down_3 = { -- Elevator floor [this must be as it is the available floors is {floor_down_3 = -3, floor_down_2 = -2, floor_down_1 = -1, floor_0 = 0, floor_up_1 = 1, floor_up_2 = 2, floor_up_3 = 3}]
            floor_name = '-3', -- Elevator floor name [you can put what ever u want even emoji's]
            position = vector3(319.93, -560.62, 28.74), -- Elevetor floor position [the position of the floor tha u wan't the playr to teleport]
            heading = 26.65 -- Elevetor floor heading [the position heading that when the player teleported will look at]
        },

        floor_down_2 = {
            floor_name = '-2',
            position = vector3(319.72, -560.17, 28.74),
            heading = 26.65
        },

        floor_down_1 = {
            floor_name = '-1',
            position = vector3(319.72, -560.17, 28.74),
            heading = 26.65
        },

        floor_0 = {
            floor_name = '0',
            position = vector3(332.41, -595.7, 43.28),
            heading = 68.1
        },

        floor_up_1 = {
            floor_name = '1',
            position = vector3(338.53, -583.78, 74.16),
            heading = 251.35
        },

        floor_up_2 = {
            floor_name = '2',
            position = vector3(338.53, -583.78, 74.16),
            heading = 251.35
        },

        floor_up_3 = {
            floor_name = '3',
            position = vector3(338.53, -583.78, 74.16),
            heading = 251.35
        }
    },
    ['police'] = {
        floor_0 = {
            floor_name = '1',
            position = vector3(434.81, -977.05, 30.71),
           heading = 355.14
        },

        floor_up_3 = {
            floor_name = '3',
            position = vector3(459.76, -977.44, 43.69),
            heading = 89.11
        }
    }
}
```
## Setup you Config as you desire
You can also put emojis on floor_name if you like so !
