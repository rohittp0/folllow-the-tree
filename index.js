const root = document.getElementById("root");

const users = {};

function makeCard(dp,name)
{
    return( 
        `<a class="card" href="#${name}">
            <img src="${dp}" width="230px" ></img>
            <h4>${name}</h4>
        </a>
        `
    )
}

async function getData(userName)
{
    if(userName in users)
    {
        root.innerHTML = users[userName];
        return;
    }

    const data = await fetch(`https://api.github.com/users/${userName}/followers`);
    const follwers = await data.json();
    console.log(follwers);

    root.innerHTML = "";

    for(const user of follwers)
    {
        const card = makeCard(user.avatar_url, user.login)
        root.innerHTML += card;
    }

    users[userName] = root.innerHTML;
}


window.addEventListener("hashchange", () => {
    const userName = location.hash.split("#")[1];
    getData(userName);
})

getData(location.hash.split("#")[1] || "rohittp0")