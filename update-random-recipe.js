fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe?id=5f7919bdccc841f9cf51bb44')
    .then(response => response.json())
    .then(data => {
        console.log(data)

        // Display recipe information on page
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("description").innerHTML = data.desc;
        document.getElementById("serving-size").innerHTML = data.servings;
        document.getElementById("image").src = data.picture;

        // Display ingredients on page
        let ingredient_list = document.getElementById("ingredients");
        for (var key in data.ingredients) {
            var node = document.createElement("LI");
            var textnode2 = document.createTextNode(data.ingredients[key]);
            var textnode = document.createTextNode(" " + key);
            node.id = key
            node.appendChild(textnode2)
            node.appendChild(textnode)
            ingredient_list.appendChild(node)
        }
        
        // Display instructions on page
        let instruction_list = document.getElementById("instructions");
        for (var key in data.instructions) {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(data.instructions[key]);
            node.appendChild(textnode)
            instruction_list.appendChild(node)
        }

        // Calculate and display the average rating
        avgRating();
        function avgRating() {
            var total = 0
            data.ratings.forEach(item => {
                let rating = Number(item)
                total += rating
            });
            var avgRating = Math.round(total / data.ratings.length * 10) / 10
            document.getElementById("rating-display").innerHTML = avgRating;
        }

        // Specify onClick functions for the buttons
        document.getElementById("decrease").onclick = function() {changeSize(-1)};
        document.getElementById("increase").onclick = function() {changeSize(1)};
        document.getElementById("submit-rating").onclick = function() {submitRating()};

        console.log(data._id)

        // Submit a new recipe rating, and update the displayed average rating 
        function submitRating() {
            let rating = Number(document.getElementById("rate-me").value);
            var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    "id": data._id,
                    "rating": rating
            }));
            data.ratings.push(rating)
            avgRating()
        }

        // Update the serving size
        function changeSize(amount) {
            let size = parseInt(document.getElementById("serving-size").innerHTML)
            if(size + amount == 0){
                return
            }
            document.getElementById("serving-size").innerHTML = size + amount

            for (var key in data.ingredients) {
                new_serving = (data.ingredients[key] / size) * (size + amount)
                data.ingredients[key] = new_serving
                document.getElementById(key).innerHTML = Math.round(data.ingredients[key] * 100) / 100 + " " + key;
            }
        }
    });
