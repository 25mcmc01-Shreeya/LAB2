let books = [];

$(document).ready(function () {

    // load XML
    $.ajax({
        url: "task8.xml",
        type: "GET",
        dataType: "xml",
        success: function (xml) {
            books = xmlToJson(xml);
            fillGenres();
            showBooks(books);
        },
        error: function () {
            alert("XML file could not be loaded.");
        }
    });

    // filter button
    $("#filterBtn").click(function () {
        applyFilter();
    });
});

// convert XML → JSON
function xmlToJson(xml) {
    let arr = [];

    $(xml).find("book").each(function () {
        arr.push({
            title: $(this).find("title").text(),
            author: $(this).find("author").text(),
            genre: $(this).find("genre").text(),
            price: parseFloat($(this).find("price").text()),
            date: $(this).find("date").text()
        });
    });

    return arr;
}

// fill dropdown
function fillGenres() {
    let uniqueGenres = [];

    books.forEach(function (b) {
        if (!uniqueGenres.includes(b.genre)) {
            uniqueGenres.push(b.genre);
        }
    });

    uniqueGenres.forEach(function (g) {
        $("#genre").append(`<option value="${g}">${g}</option>`);
    });
}

// show table
function showBooks(data) {
    let body = $("#tableBody");
    body.empty();

    if (data.length === 0) {
        body.append("<tr><td colspan='5' class='no-record'>No books found</td></tr>");
        return;
    }

    data.forEach(function (b) {
        body.append(`
            <tr>
                <td>${b.title}</td>
                <td>${b.author}</td>
                <td>${b.genre}</td>
                <td>₹${b.price}</td>
                <td>${b.date}</td>
            </tr>
        `);
    });
}

// apply filters
function applyFilter() {
    let g = $("#genre").val();
    let a = $("#author").val().toLowerCase();
    let min = $("#minPrice").val();
    let max = $("#maxPrice").val();

    let result = books.filter(function (b) {

        let genreMatch = (g === "all" || b.genre === g);
        let authorMatch = (a === "" || b.author.toLowerCase().includes(a));
        let minMatch = (min === "" || b.price >= parseFloat(min));
        let maxMatch = (max === "" || b.price <= parseFloat(max));

        return genreMatch && authorMatch && minMatch && maxMatch;
    });

    showBooks(result);
}