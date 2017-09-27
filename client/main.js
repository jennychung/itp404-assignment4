//RENDER REPOS

var searchbutton = document.getElementById('search');


let reposTemplate = $('#repos-template').html();
let renderRepos = Handlebars.compile(reposTemplate);


let repoTemplate = $('#repo-template').html();
let renderRepo = Handlebars.compile(repoTemplate);

let repoList;

searchbutton.addEventListener('click', function () {



    var searchvalue = $('#usersearch').val();
    $.getJSON('https://api.github.com/users/' + searchvalue + '/repos').then(function (results) {
        console.log(results);

        var data = results;

        document.querySelector("#isearched").innerHTML = searchvalue +"'s Repos:";


        var template = document.getElementById('github-template').innerHTML;

        var renderData = Handlebars.compile(template);
        document.getElementById('github-content').innerHTML = renderData({
            github_content: data
        });





    }, function () {
        document.querySelector("#github-content").innerHTML = "<div id='error'> Oops! Something went wrong! </div>";
    });


    let repoBody = $('#usersearch').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/repos',
        data: {
            term: repoBody,
            createdAt: new Date()
        }
    }).then(function (response) {
        repoList.push(response);
        renderRepoList();



    }, function (error) {
        console.log(response);
    });
});





$.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/repos'
}).then(function (response) {
    repoList = response;
    renderRepoList();
});


function renderRepoList() {

    let reposHTML = renderRepos({
        repos: repoList
    });
    $('div#repos').html(reposHTML);

}