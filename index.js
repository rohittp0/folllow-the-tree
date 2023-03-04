const root = document.getElementById("root");

function makeCard(dp,name, relative=true)
{
    return(
        `<a class="card" href="${relative ? '#' : ''}${name}">
            <img src="${dp}" width="230px"  alt="${name}'s DP">
            <h4>${relative ? name : "Click to Add Your Self" }</h4>
        </a>
        `
    )
}

async function getAllPages(url) {
    const resultsPerPage = 100; // the number of results to fetch per page
    let currentPage = 1; // the current page of results

    let allData = []; // an array to store all the data

    while (true) {
        const response = await fetch(`${url}?per_page=${resultsPerPage}&page=${currentPage}`);
        const data = await response.json().catch(() => []);

        if (!data || !(data.length > 0)) {
            // if there is no data on this page, we have reached the end
            break;
        }

        allData = allData.concat(data); // add the data from this page to the array

        currentPage++; // move on to the next page
    }

    return allData.reverse();
}


async function getData(userName)
{
    const followUrl = `https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2F${userName}`;

    const followers = await getAllPages(`https://api.github.com/users/${userName}/followers`);

    root.innerHTML = "";

    root.innerHTML += makeCard("assets/qr.png", followUrl, false);

    for(const user of followers)
    {
        const card = makeCard(user.avatar_url, user.login)
        root.innerHTML += card;
    }
}

window.addEventListener("hashchange", () => {
    const userName = location.hash.split("#")[1];
    return getData(userName);
})

getData(location.hash.split("#")[1] || "rohittp0").then();
