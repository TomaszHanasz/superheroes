import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import "./superheroesApp.style.css";

const SuperheroesApp = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    realName: "",
    teamName: "",
    superPower: "",
    pictureUrl: "",
  });
  const [heroList, setHeroList] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onChangeHandler = (e) => {
    setHeroData({ ...heroData, [e.target.name]: e.target.value });
  };

  const getAllHeroes = async () => {
    try {
      const heroesCollection = collection(db, "superheroes");
      const heroesSnapshot = await getDocs(heroesCollection);
      const herolist = heroesSnapshot.docs.map((el) => {
        return { ...el.data(), id: el.id };
      });
      setHeroList(herolist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllHeroes();
  }, []);

  const onAddHeroBtn = async () => {
    try {
      const addHero = {
        name: heroData.name,
        realName: heroData.realName,
        teamName: heroData.teamName,
        pictureUrl: heroData.pictureUrl,
        superPower: heroData.superPower,
      };
      const heroesCollection = collection(db, "superheroes");
      await addDoc(heroesCollection, addHero);
      setHeroData({
        name: "",
        realName: "",
        teamName: "",
        superPower: "",
        pictureUrl: "",
      });
      await getAllHeroes();
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = async (heroId) => {
    try {
      await deleteDoc(doc(db, "superheroes", heroId));
      await getAllHeroes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="superhero-form__container">
      <form onSubmit={onSubmitHandler} className="superhero-form">
        <label>Name:</label>
        <input
          placeholder="enter name"
          name="name"
          value={heroData.name}
          onChange={onChangeHandler}
          required
        />
        <label>Real name:</label>
        <input
          placeholder="enter real name"
          name="realName"
          value={heroData.realName}
          onChange={onChangeHandler}
          required
        />
        <label>Team Name:</label>
        <input
          placeholder="enter team name"
          name="teamName"
          value={heroData.teamName}
          onChange={onChangeHandler}
          required
        />
        <label>Super Power:</label>
        <input
          placeholder="enter superPower"
          name="superPower"
          value={heroData.superPower}
          onChange={onChangeHandler}
          required
        />
        <label>Picture Url:</label>
        <input
          placeholder="enter pic url"
          name="pictureUrl"
          value={heroData.pictureUrl}
          onChange={onChangeHandler}
          required
        />
        <button
          type="submit"
          onClick={onAddHeroBtn}
          className="superhero-form__add-btn"
        >
          Add Hero
        </button>
      </form>
      <div className="hero-card__container">
        {heroList.map((el, index) => {
          return (
            <div className="hero-card" key={index} id={el.id}>
              <img
                src={`${el.pictureUrl}`}
                className="hero-card__img"
                alt="superhero"
              />
              <h1>{el.name}</h1>
              <p>Real name: {el.realName}</p>
              <p>Team: {el.teamName}</p>
              <p>Super power:{el.superPower}</p>
              <button onClick={() => onDeleteHandler(el.id)}>
                Remove Hero
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SuperheroesApp;
