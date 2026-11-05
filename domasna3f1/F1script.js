
var drivers = [
    {
        name: "Max Verstappen",
        team: "Red Bull",
        speed: 320,
        skill: 98,
        tyres: "Soft",
        pitLap: 3,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Michael Schumacher",
        team: "Ferrari",
        speed: 323,
        skill: 99,
        tyres: "Medium",
        pitLap: 4,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Lewis Hamilton",
        team: "Ferrari",
        speed: 315,
        skill: 97,
        tyres: "Soft",
        pitLap: 5,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Charles Leclerc",
        team: "Ferrari",
        speed: 318,
        skill: 95,
        tyres: "Medium",
        pitLap: 6,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Lando Norris",
        team: "McLaren",
        speed: 319,
        skill: 96,
        tyres: "Soft",
        pitLap: 7,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Oscar Piastri",
        team: "McLaren",
        speed: 316,
        skill: 94,
        tyres: "Medium",
        pitLap: 3,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "George Russell",
        team: "Mercedes",
        speed: 314,
        skill: 93,
        tyres: "Soft",
        pitLap: 4,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Fernando Alonso",
        team: "Aston Martin",
        speed: 310,
        skill: 96,
        tyres: "Medium",
        pitLap: 5,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Carlos Sainz",
        team: "Williams",
        speed: 312,
        skill: 94,
        tyres: "Soft",
        pitLap: 6,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    },
    {
        name: "Sergio Perez",
        team: "Red Bull",
        speed: 313,
        skill: 91,
        tyres: "Medium",
        pitLap: 7,
        pitDone: false,
        totalTime: 0,
        status: "Ready"
    }
];

var currentLap = 0;
var raceStarted = false;
var raceFinished = false;
var safetyCar = false;

function showDrivers() 
{

    drivers.sort(function(a, b)
     {
        return a.totalTime - b.totalTime;
     });

    var text = "";

    for (var i = 0; i < drivers.length; i++) 
    {

        var name = drivers[i].name;

        if (raceFinished == true && i == 0)
        {
            name = name + " - WINNER";
        }

        text = text + "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + name + "</td>" +
            "<td>" + drivers[i].team + "</td>" +
            "<td>" + drivers[i].speed + "</td>" +
            "<td>" + drivers[i].skill + "</td>" +
            "<td>" + drivers[i].tyres + "</td>" +
            "<td>" + Math.round(drivers[i].totalTime * 100) / 100 + " s</td>" +
            "<td>" + drivers[i].status + "</td>" +
            "</tr>";
    }

    document.getElementById("rows").innerHTML = text;
}


function startRace()
 {

    if (raceStarted == true) 
    {
        return;
    }

    raceStarted = true;

    document.getElementById("startButton").disabled = true;
    document.getElementById("nextLapButton").disabled = false;

    for (var i = 0; i < drivers.length; i++) 
    {
        drivers[i].status = "Racing";
    }

    document.getElementById("eventList").innerHTML +=
        "<li>The race has started.</li>";

    showDrivers();
}


function calculateTime(driver) 
{

    var time;
    var penalty;

    time = 90 + (320 - driver.speed) * 0.15;
    time = time - (driver.skill - 90) * 0.20;

    if (driver.tyres == "Soft") 
    {
        time = time - 0.7;
    } 
    else
    {
        time = time + 0.3;
    }

    if (safetyCar == true)
    {
        time = time + 5;
        driver.status = "Safety Car";
    } 
    else 
    {
        driver.status = "Racing";
    }

    if (driver.pitDone == false && currentLap == driver.pitLap)
    {

        if (driver.tyres == "Soft")
        {
            driver.tyres = "Medium";
        } 
        else
        {
            driver.tyres = "Soft";
        }

        driver.pitDone = true;
        time = time + 20;

        if (safetyCar == true)
        {
            driver.status = "Pit Stop / Safety Car";
        }
        else 
        {
            driver.status = "Pit Stop";
        }

        document.getElementById("eventList").innerHTML +=
            "<li>Lap " + currentLap + ": " +
            driver.name + " changed tyres.</li>";
    }

    
    else if (Math.random() < 0.10)
    {

        penalty = 5 + Math.random() * 5;
        time = time + penalty;

        if (safetyCar == true)
        {
            driver.status = "Spin / Safety Car";
        } 
        else 
        {
            driver.status = "Spin";
        }

        document.getElementById("eventList").innerHTML +=
            "<li>Lap " + currentLap + ": " +
            driver.name + " spun off the track.</li>";
    }

    return time;
}

function nextLap() {

    if (raceStarted == false || raceFinished == true)
    {
        return;
    }

    currentLap++;

    document.getElementById("currentLap").innerHTML = currentLap;

    safetyCar = Math.random() < 0.15;

    if (safetyCar == true)
    {
        document.getElementById("eventList").innerHTML +=
            "<li>Lap " + currentLap +
            ": Safety Car is on the track.</li>";
    }

    for (var i = 0; i < drivers.length; i++)
    {

        var time = calculateTime(drivers[i]);

        drivers[i].totalTime = drivers[i].totalTime + time;
    }

    showDrivers();

    document.getElementById("eventList").innerHTML +=
        "<li>Lap " + currentLap + " completed.</li>";

    if (currentLap == 10) 
    {
        finishRace();
    }
}

function finishRace() {

    raceFinished = true;

    document.getElementById("nextLapButton").disabled = true;

    for (var i = 0; i < drivers.length; i++)
    {
        if (drivers[i].status == "Racing" ||
            drivers[i].status == "Safety Car") 
        {

            drivers[i].status = "Finished";
        }
    }

    showDrivers();

    document.getElementById("eventList").innerHTML +=
        "<li>Winner: " + drivers[0].name + "</li>";
}





