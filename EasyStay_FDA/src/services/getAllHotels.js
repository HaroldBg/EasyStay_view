import { ref } from 'vue'

const getAllHotels = () => {
  const hotels = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      let data = await fetch('http://127.0.0.1:8000/api/hotel')
      console.log(data);
      if (!data.ok) {
        throw Error('Error while fetching hotels')
      }

      const big = await data.json()
      hotels.value = big.Hotels
      console.log(hotels.value);

    } catch (err) {
      console.log(err);
      error.value = err.message
    }
  }

  return { hotels, error, load }
}

export default getAllHotels
