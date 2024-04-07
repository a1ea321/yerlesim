document.addEventListener("DOMContentLoaded", function() {
    // Used in display.html:
    var CHECKBOX_PREFIX = "checkbox_";
    var LAYER_PREFIX = "img_";

    var container = document.querySelector('.container');
    var cursor = document.querySelector('.cursor');

    // Elements of these two lists are supposed to be in a 1-to-1 correspondence
    // to each other.
    var checkboxes = document.querySelectorAll('.layer-checkbox');
    var images = document.querySelectorAll('.layer-img');

    var url_params = queryStringToDict(window.location.search);

    redrawCursor();
    redrawCheckboxesAndLayers();

    // Stuff to do when the plan is clicked
    container.addEventListener('click', function(event) {
        url_params['cursor_x'] = event.pageX - container.offsetLeft;
        url_params['cursor_y'] = event.pageY - container.offsetTop;
        redrawCursor();
        updateWindowHistory();
    });

    // ∀ checkbox: add listener
    checkboxes.forEach(function(checkbox, index) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                images[index].style.display = 'block';
                url_params[getIdFromCheckbox(this)] = true;
            } 
            else {
                images[index].style.display = 'none';
                url_params[getIdFromCheckbox(this)] = false;
            }
            updateWindowHistory();
        });
    });

    // Function to get X and Y coordinates from the address bar
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Puts the cursor centered on the point defined by `url_params`.
    function redrawCursor() {
        if (isNaN(url_params['cursor_x'])) return;
        if (isNaN(url_params['cursor_y'])) return;
        cursor.style.display = 'block';
        cursor.style.left = (url_params['cursor_x'] - cursor.width / 2) + 'px';
        cursor.style.top = (url_params['cursor_y'] - cursor.height / 2) + 'px';
    }

    // Function to convert a query string to a dictionary
    function queryStringToDict(queryString) {
        var dict = {};
        var pairs = queryString.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            dict[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return dict;
    }

    // Function to convert a dictionary to a query string
    function dictToQueryString(dict) {
        var queryString = '';
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                if (queryString !== '') {
                    queryString += '&';
                }
                queryString += encodeURIComponent(key) + '=' + encodeURIComponent(dict[key]);
            }
        }
        return queryString;
    }

    function redrawCheckboxesAndLayers() {
        checkboxes.forEach(function(checkbox, index) {
            id = getIdFromCheckbox(checkbox);
            if (url_params[id] == 'false') {
                checkbox.checked = false;
                images[index].style.display = 'none';
            }
            else {
                checkbox.checked = true;
                images[index].style.display = 'block';
            }
        });
    }

    function updateWindowHistory() {
        var params = '?' + dictToQueryString(url_params);
        console.log(params);
        window.history.pushState(null, null, params);
    }

    function getIdFromCheckbox(checkbox) {
        return checkbox.id.replace(new RegExp('^' + CHECKBOX_PREFIX), '');
    }

});

