import { useForm } from "react-hook-form"

const AddPlantForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    console.log("Submitted Plant Data:", data)

    // You can handle API POST request here
    // axios.post('/api/plant', data)

    reset()
  }

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>

          {/* LEFT SIDE */}
          <div className='space-y-6'>

            {/* Name */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Name
              </label>
              <input
                {...register("name", { required: "Name is required." })}
                className='w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500'
                id='name'
                type='text'
                placeholder='Plant Name'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name.message}</p>
              )}
            </div>

            {/* Category */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600'>
                Category
              </label>
              <select
                {...register("category", { required: "Category is required." })}
                className='w-full px-4 py-3 border-lime-300 rounded-md bg-white focus:outline-lime-500'
              >
                <option value='Indoor'>Indoor</option>
                <option value='Outdoor'>Outdoor</option>
                <option value='Succulent'>Succulent</option>
                <option value='Flowering'>Flowering</option>
              </select>
              {errors.category && (
                <p className='text-red-500 text-sm'>{errors.category.message}</p>
              )}
            </div>

            {/* Description */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='description' className='block text-gray-600'>
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required."
                })}
                id='description'
                placeholder='Write plant description here...'
                className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500'
              ></textarea>
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className='space-y-6 flex flex-col'>

            {/* Price & Quantity */}
            <div className='flex justify-between gap-2'>

              {/* Price */}
              <div className='space-y-1 text-sm w-full'>
                <label htmlFor='price' className='block text-gray-600'>
                  Price
                </label>
                <input
                  {...register("price", {
                    required: "Price is required."
                  })}
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500'
                  id='price'
                  type='number'
                  placeholder='Price per unit'
                />
                {errors.price && (
                  <p className='text-red-500 text-sm'>
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className='space-y-1 text-sm w-full'>
                <label htmlFor='quantity' className='block text-gray-600'>
                  Quantity
                </label>
                <input
                  {...register("quantity", {
                    required: "Quantity is required."
                  })}
                  className='w-full px-4 py-3 text-gray-800 border border-lime-300 rounded-md bg-white focus:outline-lime-500'
                  id='quantity'
                  type='number'
                  placeholder='Available quantity'
                />
                {errors.quantity && (
                  <p className='text-red-500 text-sm'>
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className='p-4 w-full m-auto rounded-lg grow'>
              <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                <div className='flex flex-col w-max mx-auto text-center'>
                  <label>
                    <input
                      {...register("image", { required: "Image is required." })}
                      className='text-sm cursor-pointer w-36 hidden'
                      type='file'
                      accept='image/*'
                    />
                    <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-600'>
                      Upload
                    </div>
                  </label>
                </div>
              </div>
              {errors.image && (
                <p className='text-red-500 text-sm text-center mt-2'>
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full cursor-pointer p-3 mt-5 text-center font-medium text-white rounded shadow-md bg-lime-500 hover:bg-lime-600'
            >
              Save & Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPlantForm
