var ElevatorsTable = [];
var MenuName
var FloorName
var CurrentPossition

$(function() {
    window.addEventListener("message", function(event) {
        var item = event.data;
        if (item !== undefined && item.type === "ui") {
            if (item.display) {
                CurrentPossition = item.current_position;
                ShowUI();
            } else {
                CloseUI(false);
            }
        } else if (item !== undefined && item.type === "tick") {
            ElevatorsTable = item.table;
            MenuName = item.name;
            FloorName = item.floor_name;
        }
    });

    document.onkeyup = function(data) {
        if (data.which == 27) {
            CloseUI(true);
        }
    };
});

function ResetMenu() {
    $("div").each(function(i, obj) {
        var element = $(this);

        if (element.attr("data-parent")) {
            element.hide();
        } else {
            element.show();
        }
    });
}

function init() {
    $(".menuoption").each(function(i, obj) {
        if ($(this).attr("data-action")) {
            var data = $(this).data("action");
            $.each(JSON.parse(ElevatorsTable), function(tablename, coords) {
                if (tablename == data) {
                    let string = MenuName + ' elevator'
                    let floorname = coords.floor_name
                    document.getElementById('buttonid_' + data).innerHTML = floorname.toUpperCase();
                    document.getElementById("titleContainer").innerHTML = string.toUpperCase();
                    if (coords.position.z == CurrentPossition) {
                        document.getElementById(data).style.display = 'none' //to show
                    } else {
                        document.getElementById(data).style.display = 'block' //to show
                    }
                }
            });
            $(this).click(function() {
                sendData(data);
            });
        }
    });
}

function ShowUI() {
    ResetMenu();
    $('mainContainer').css('display', 'block')
    $(".actionmenu").fadeIn(100);
    init();
}

function CloseUI(post) {
    ResetMenu()
    $('mainContainer').css('display', 'none')
    $(".actionmenu").fadeOut(100);
    if (post) {
        $.post(`https://${GetParentResourceName()}/close`, JSON.stringify({}));
    }
}

function sendData(data) {
    $.each(JSON.parse(ElevatorsTable), function(tablename, coords) {
        if (coords.position == CurrentPossition) {
            document.getElementById(data).style.display = 'none' //to hide
        }
        if (tablename == data) {
            $.post(`https://${GetParentResourceName()}/teleport`, JSON.stringify({
                position: coords.position
            }));
            CloseUI(true);
        }
    });
}