
import React, { useState, useEffect } from "react";
import './Main.css'
import article from "../Data/articles.json"


const Main = () => {

    function computeInitialCounter(){
        return Math.trunc(Math.random() * 20)
    }

    //setState

    const [counter, setCounter] = useState(() => {
        return computeInitialCounter()
    });

    function increment () {
        setCounter((prevCounter) => {
            return prevCounter + 1;
        })
        setCounter(prevCounter => prevCounter + 1)
    }

    function decrement () {
        setCounter(counter - 1);
    }


    const [type, setType] = useState("users");
    const [data, setData] = useState([]);
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })


    //useEffect
    // useEffect - вызываеться каждый раз когда происходит рендер компонента
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(response => response.json())
        .then(json => setData(json))
    },[type]) // тут второй аргумент [type] означает, что useEffect нужно вызывать только если
              // изменился type

    const mouseMoveHandler = event => {
        setPosition({
            x: event.clientX,
            y: event.clientY
        });
    }

    useEffect(() => {
        window.addEventListener('mousemove', mouseMoveHandler)
    })
        return (
            <div className="main-block">
                {article.map(item => 
                    <section> 
                        <h2>{item.title}</h2>
                        <div>{item.description}</div>
                    </section>
                )}
                <div>{counter}</div>
                <button onClick={increment}>Increment +2</button>
                <button onClick={decrement}>Decrement -1</button>
                <div>--------------------------------------------</div>

                <h2>Resource: {type}</h2>
                <button onClick={() => setType('Users')}>Users</button>
                <button onClick={() => setType('Todos')}>Todo</button>
                <button onClick={() => setType('Posts')}>Posts</button>

                <pre>{JSON.stringify(data, null, 2)}</pre>
                <pre>{JSON.stringify(position, null, 2)}</pre>
            </div>
        )
}

export default Main;