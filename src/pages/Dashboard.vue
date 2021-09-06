<template>
    <div id="container">
            <header>
                <ul class="navigation-list">
                    <li class="navigation-item"><a href="#">Posts</a></li>
                    <li class="navigation-item"><a href="#">Products</a></li>
                    <li class="navigation-item"><a href="#">About Us</a></li>
                </ul>
            </header>
            <aside>
                <p>My super awesome sidebar</p>
            </aside>
            <main>
                <h1>CSS Grid or Flexbox
                </h1>
                <p>When should you use which?</p>
            </main>
            <footer>
                <ul class="navigation-list">
                    <li class="navigation-item"><a href="#">Terms of Use</a></li>
                    <li class="navigation-item"><a href="#">Support</a></li>
                </ul>
            </footer>
    </div>
</template>

<style scoped>
#container{
    height: 100vh;
    background: chartreuse;
    margin-left: 270px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 5fr 1fr;
}
header,
aside,
main,
footer {
    padding: 16px;
    text-align: center;
}

header {
    background: #521751;
    grid-column: 1/3;
}

aside {
    background: #fa923f;
    width: 70%;
}

footer {
    background: black;
    grid-column: 1/3;
}

.navigation-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.navigation-item a {
    text-decoration: none;
    color: white;
}

.navigation-item a:hover,
.navigation-item a:active {
    color: #fa923f;
}
</style>