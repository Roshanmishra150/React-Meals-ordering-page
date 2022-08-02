
import classes from './AvailableMeals.module.css'
import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


 

const AvalaibleMeals = () => {
  const [Meals, setMeals] = useState([])
  const [IsLodding, setIsLodding] = useState(true)
  const [Error, setError] = useState()

  useEffect(() => {
    setIsLodding(true)
    const fetchMeals = async () => {
      const response = await fetch('https://apipractice-4fffe-default-rtdb.firebaseio.com/meals.json')

      if (!response.ok){
        throw new Error('something went wrong !!!');
      }
      const responseDate = await response.json()
      
      const loadedMeals = [];

      for (const key in responseDate){
        loadedMeals.push({
          id:key,
          name:responseDate[key].name,
          description:responseDate[key].description,
          price:responseDate[key].price,

        })
      }
      setMeals(loadedMeals)
      setIsLodding(false)
    }

      fetchMeals().catch((error) => {
        setIsLodding(false)
      setError(error.message)
      })
      
    
  }, [])
  
  if (IsLodding){
    return(
      <section className={classes.MealsLoading}>
        <p>  ...Loading  </p>
      </section>
    )
  }

    if (Error){
    return(
      <section className={classes.MealsError}>
        <p>  {Error}  </p>
      </section>
    )
  }


  const MealsList = Meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)
  
  return (
    <section className={classes.meals}>
        <Card>
            <ul>
                {MealsList}
            </ul>
        </Card>
    </section>
    
  )
}

export default AvalaibleMeals