//1. create:
//<a href="main">Sterters</a>

//2. assign link to correct nav


const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});
//4. assign products to correct section


//1. fetch cats
fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(res => res.json())
    .then(createCategories)


function createCategories(data) {


    data.forEach(function (oneCat) {

        //create links
        const link = document.createElement("a");
        link.setAttribute("href", `#${oneCat}`);
        link.textContent = oneCat
        document.querySelector("#wrapper>header>nav").appendChild(link)

        //create sections
        const section = document.createElement("section");
        //3. assign id
        section.id = oneCat;
        const h2 = document.createElement("h2");
        h2.textContent = oneCat;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);


    })
    getProducts();
}


function getProducts() {
    //fetching json
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showData(data)
        })

}



function showData(jsonData) {
    console.log(jsonData);
    jsonData.forEach(addCourses);
};


// 1 make a template


function addCourses(course) {
    //    console.log(course)


    //    1 grab the template
    const template = document.querySelector("#courseTemplate").content;

    //    2 make a copy
    const courseClone = template.cloneNode(true);

    //    3 change some content
    courseClone.querySelector("h3").textContent = course.name;


    //    change the soldout
    if (course.soldout == true) {
        courseClone.querySelector(".soldout").style.display = "block"
        //        console.log('soldout')
    }

    //    change the info content
    courseClone.querySelector(".info p").textContent = course.shortdescription;


    //    change the price & discount
    if (course.discount) { //on sale
        courseClone.querySelector(".price-discount span").textContent = course.price;
        const newPrice = Math.round(course.price - course.price * course.discount / 100);

        courseClone.querySelector(".price-full span").textContent = newPrice;
        //calculate new price
        // 49-49*10/100
        //course.price - course.price*price.discount/100

    } else { // not on discount
        courseClone.querySelector(".price-discount").remove();
        courseClone.querySelector(".price-full span").textContent = course.price;
    }

 

    //     images syntaxes from API
    const imageName = course.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";

    courseClone.querySelector("img").src = smallImg;


courseClone.querySelector("button").addEventListener("click", () => {
    console.log("click", course)
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
      .then(res => res.json())
      .then(showDetails);
  });

  console.log(`#${course.category}`)
    //    4 append the clone
    document.querySelector(`#${course.category}`).appendChild(courseClone)
    
    
}
function showDetails(data) {
  console.log(data);
    const imageName = data.image;
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const largeImg = base + "large/" + imageName + ".jpg";
    console.log (largeImg);
    
    //const discount = data.discount;
   if (data.discount) { //on sale
        modal.querySelector(".price-discount span").textContent = data.price;
        const newPrice = Math.round(data.price - data.price * data.discount / 100);

        modal.querySelector(".price-full span").textContent = newPrice;

    } else { // not on discount
       // modal.querySelector(".price-discount").remove()
        modal.querySelector(".price-full span").textContent = data.price
    }
  modal.querySelector(".modal-image").src = largeImg;
  modal.querySelector(".modal-name").textContent = data.name;
  modal.querySelector(".modal-description").textContent = data.longdescription;
  modal.querySelector(".modal-region span").textContent = data.region;
    if (data.vegetarian == false) {
        modal.querySelector(".modal-vegetarian span").textContent = "With meat !";
    }else{
        modal.querySelector(".modal-vegetarian span").textContent = "Vegetarian !";
        //        console.log('soldout')
    }
  if (data.alcohol > 0) {
        modal.querySelector(".modal-alcohol span").textContent = "With " + data.alcohol + "%";
        //        console.log('soldout')
  }
  if(data.allergens == ""){}else{
    modal.querySelector(".modal-allergens span").textContent = data.allergens;
  }
  var text = "N/A";
    if(data.stars == "1"){text = " *"}
    else if(data.stars == "2"){text = " * *"}
    else if(data.stars == "3"){text = " * * *"}
    else if(data.stars == "4"){text = " * * * *"}
    else if(data.stars == "5"){text = " * * * * *"}
    else{}
  modal.querySelector(".modal-stars span").textContent = text;
  //...
  modal.classList.remove("hide");
}

//const whoIsYourDaddy = document.querySelector("#starters")
//whoIsYourDaddy.appendChild(courseClone)


//2 loop through the jsonData
