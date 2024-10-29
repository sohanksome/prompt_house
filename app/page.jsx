import Feed from '@components/Feed'
import Nav from '@components/Nav'

const Home = () => {
  return (
   
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          AI Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        In this place, you can create, 
        explore, and share different 
        prompts
      </p>
      <Feed />
    </section>
  )
}

export default Home