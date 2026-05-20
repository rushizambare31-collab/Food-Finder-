// Food Finder : ProjectByUsing_HTML_TailwindCSS_JS
let search_button_var = document.querySelector("#search_button");
let search_box_var = document.querySelector("#search_box");
let recipe_found_notFound_var = document.querySelector("#recipe_found_notFound");
let card_container_var = document.querySelector("#card_container");

search_button_var.addEventListener("click", function () {

    card_container_var.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_box_var.value}`)
        .then(response => response.json())
        .then(data => {
            if (search_box_var.value == "") {
                recipe_found_notFound_var.textContent = "Please! Search Any Recipe...";
                recipe_found_notFound_var.className = "text-3xl text-black text-center font-semibold";
            }
            else if (!data.meals) {
                recipe_found_notFound_var.textContent = "Recipe Not Found, Please Try Another Recipe!";
                recipe_found_notFound_var.className = "text-3xl text-black text-center font-semibold";

                let recipe_foundNotFound_div = document.createElement("div");
                recipe_foundNotFound_div.className = "bg-amber-300 size-96 ml-[525px] rounded-2xl overflow-hidden";

                let img_notFound = document.createElement("img");
                img_notFound.src = "/Recipe not found.jpeg";
                img_notFound.alt = "Recipe Are Not Found";

                recipe_foundNotFound_div.appendChild(img_notFound);
                card_container_var.appendChild(recipe_foundNotFound_div);

            } else {
                recipe_found_notFound_var.textContent = "Your All Possible Recipes Are Here...";
                recipe_found_notFound_var.className = "text-3xl text-black text-center font-semibold";

                data.meals.forEach(recipe => {

                    // OUTER 3D CARD WRAPPER
                    let mainWrapper = document.createElement("div");
                    mainWrapper.className = "h-[380px] w-[250px] inline-block m-4 perspective-1000";

                    // FLIP WRAPPER
                    let flipCard = document.createElement("div");
                    flipCard.className = "relative h-full w-full duration-700 [transform-style:preserve-3d]";

                    // FRONT SIDE
                    let frontSide = document.createElement("div");
                    frontSide.className = "absolute inset-0 bg-amber-400 inline-block justify-items-center p-5 rounded-xl [backface-visibility:hidden]";

                    // Image wrapper
                    let imgBox = document.createElement("div");
                    imgBox.className = "size-52 bg-amber-900 bg-cover overflow-hidden bg-no-repeat";

                    let img = document.createElement("img");
                    img.src = recipe.strMealThumb;
                    img.alt = `${recipe.strMeal} image`;
                    img.className = "w-full h-full object-cover";

                    imgBox.appendChild(img);
                    frontSide.appendChild(imgBox);

                    // Heading
                    let h3 = document.createElement("h3");
                    h3.className = "text-[20px] font-semibold text-center mt-1";
                    h3.innerText = recipe.strMeal;
                    frontSide.appendChild(h3);

                    // View Recipe Button
                    let viewBtn = document.createElement("div");
                    viewBtn.className = "bg-gray-800 h-12 w-44 flex items-center justify-center mt-3 rounded-2xl cursor-pointer";

                    let ViewBtn_icon_var = document.createElement("i");
                    ViewBtn_icon_var.className = "text-3xl text-yellow-500 fa-solid fa-arrow-right";

                    viewBtn.appendChild(ViewBtn_icon_var);
                    frontSide.appendChild(viewBtn);



                    // BACK SIDE
                    let backSide = document.createElement("div");
                    backSide.className = "absolute inset-0 bg-yellow-500 p-5 rounded-xl inline-block justify-items-center content-center [transform:rotateY(180deg)] [backface-visibility:hidden]";

                    let backTitle = document.createElement("h2");
                    backTitle.className = "text-xl font-bold text-center mb-3";
                    backTitle.innerText = "Recipe Details";
                    backSide.appendChild(backTitle);

                    // Back side View Recipe Button (optional)
                    let backBtn = document.createElement("div");
                    backBtn.className = "bg-gray-800 h-12 w-44 flex items-center justify-center mt-3 rounded-2xl cursor-pointer";

                    let backBtnText = document.createElement("h4");
                    backBtnText.className = "text-yellow-500 text-2xl";
                    backBtnText.innerText = "View Recipe";

                    backBtn.appendChild(backBtnText);
                    backSide.appendChild(backBtn);

                    // YouTube Link inside back side
                    let linkTag_a = document.createElement("a");
                    linkTag_a.href = recipe.strYoutube;
                    linkTag_a.textContent = "Watch on YouTube";
                    linkTag_a.target = "_blank";
                    linkTag_a.className = "mt-4 block text-center underline text-blue-800 font-semibold";
                    backSide.appendChild(linkTag_a);

                    // Back To Front button : 
                    let box_of_BackToFront_var = document.createElement("div");
                    box_of_BackToFront_var.className = "bg-gray-800 h-12 w-28 flex items-center justify-center mt-3 rounded-2xl cursor-pointer";
                    let BackToFront_var = document.createElement("i");
                    BackToFront_var.className = "text-3xl text-yellow-500 fa-solid fa-arrow-left";

                    box_of_BackToFront_var.appendChild(BackToFront_var);
                    backSide.appendChild(box_of_BackToFront_var);


                    // Append front & back
                    flipCard.appendChild(frontSide);
                    flipCard.appendChild(backSide);
                    mainWrapper.appendChild(flipCard);
                    card_container_var.appendChild(mainWrapper);

                    // ----- CLICK FUNCTION TO FLIP CARD -----
                    viewBtn.addEventListener("click", () => {
                        flipCard.classList.toggle("[transform:rotateY(180deg)]");
                    });
                    box_of_BackToFront_var.addEventListener("click", () => {
                        flipCard.classList.toggle("[transform:rotateY(180deg)]");
                    });

                    backBtn.addEventListener("click", function (process) {
                        // ==========================
                        // Recipe Book Popup CreateElement Code
                        // ==========================

                        // background white transparent :
                        let bgWhite = document.createElement("div");
                        bgWhite.className = "fixed inset-0 bg-white/35 z-50 flex justify-center items-center ";

                        // book type recipe book :
                        let bookMain = document.createElement("div");
                        bookMain.className = "bg-black h-[600px] w-[1000px] p-2 fixed z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[5px_10px_25px__black]";

                        // ===== Cross Section =====
                        let crossWrapper = document.createElement("div");
                        crossWrapper.className = "h-10 w-full flex justify-end";

                        let recipe_book_var = document.createElement("h3");
                        recipe_book_var.className = "text-3xl text-center text-white font-semibold italic mr-[340px]";
                        recipe_book_var.innerText = "RECIPE BOOK"

                        let crossBtn = document.createElement("div");
                        crossBtn.className = "h-full w-10 flex justify-center items-center rounded-[5px] hover:bg-red-600 duration-200";

                        let crossIcon = document.createElement("i");
                        crossIcon.className = "text-2xl text-white fa-solid fa-xmark";

                        crossBtn.appendChild(crossIcon);
                        crossWrapper.appendChild(recipe_book_var);
                        crossWrapper.appendChild(crossBtn);  
                        bookMain.appendChild(crossWrapper);

                        // ===== Two Pages Wrapper =====
                        let pagesWrapper = document.createElement("div");
                        pagesWrapper.className = "mt-2 flex";

                        // =========== LEFT PAGE ===========
                        let leftPage = document.createElement("div");
                        leftPage.className = "bg-yellow-400 h-[536px] w-[500px] border-r-2 border-r-orange-500 inline-block justify-items-center content-center";

                        // Image box
                        let imgBoxLeft = document.createElement("div");
                        imgBoxLeft.className = "size-64 rounded-[10px] bg-center bg-cover bg-no-repeat overflow-hidden";

                        let imgLeft = document.createElement("img");
                        imgLeft.src = recipe.strMealThumb;
                        imgLeft.alt = `${recipe.strMeal} image`;
                        imgBoxLeft.appendChild(imgLeft);

                        // Name text
                        let nameDiv = document.createElement("div");
                        nameDiv.className = "w-56 min-h-20 content-center";

                        let nameText = document.createElement("h1");
                        nameText.className = "italic font-semibold block text-center text-3xl mt-2";
                        nameText.innerText = recipe.strMeal;

                        nameDiv.appendChild(nameText);

                        // append left page
                        leftPage.appendChild(imgBoxLeft);
                        leftPage.appendChild(nameDiv);

                        // =========== RIGHT PAGE ===========
                        let rightPage = document.createElement("div");
                        rightPage.className = "bg-yellow-500 h-[536px] w-[500px] p-5";

                        // recipe name bar
                        let recipeBar = document.createElement("div");
                        recipeBar.className = "bg-red-500 h-10 w-full content-center rounded-[5px]";

                        let recipeTitle = document.createElement("h3");
                        recipeTitle.className = "text-center font-semibold text-[20px]";
                        recipeTitle.innerText = `${recipe.strMeal} Recipe`;
                        
                        recipeBar.appendChild(recipeTitle);

                        // recipe process container
                        let recipeProcess = document.createElement("div");
                        recipeProcess.className = "bg-yellow-500 h-[450px] w-full mt-3 overflow-y-auto p-5";

                        let para = document.createElement("p");
                        para.className = "text-[20px] font-sans italic text-justify";

                        para.innerText = recipe.strInstructions;

                        recipeProcess.appendChild(para);

                        // append right page
                        rightPage.appendChild(recipeBar);
                        rightPage.appendChild(recipeProcess);

                        // append pages to wrapper
                        pagesWrapper.appendChild(leftPage);
                        pagesWrapper.appendChild(rightPage);

                        // append wrapper to book
                        bookMain.appendChild(pagesWrapper);

                        // finally add both to BODY
                        document.body.appendChild(bgWhite);
                        document.body.appendChild(bookMain);

                        crossBtn.addEventListener("click" , function () {
                            bgWhite.classList.toggle("hidden");
                            bookMain.classList.toggle("hidden");
                            
                        })

                    })

                });
            }
        });
});



