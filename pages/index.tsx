import type { NextPage } from 'next'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <main className='max-w-6xl mx-auto px-4 py-2'>
          <div className='mt-8 flex flex-col space-y-4 text-2xl font-semibold px-4 py-2 max-w-2xl mx-auto'>
            <h3>현금흐름</h3>
            <h3>순자산</h3>
          </div>
          
          <div className='mt-6 space-y-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-2xl font-semibold'>소득</p>
                <ul className='px-4 py-2 rounded-lg border shadow-lg'>
                  {
                    [0,0,0,0,0,0,0].map((i)=>
                      <li key={i}>
                        소득 ~~~원
                      </li>
                  )}
                </ul>
              </div>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-2xl font-semibold'>지출</p>
                <ul className='px-4 py-2 rounded-lg border shadow-lg'>
                  {
                    [0,0,0,0,0,0,0].map((i)=>
                      <li key={i}>
                        지출 ~~~원
                      </li>
                  )}
                </ul>
              </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='px-4 py-2 space-y-2'>
                <p className='text-2xl font-semibold'>자산</p>
                <ul className='px-4 py-2 rounded-lg border shadow-lg'>
                  {
                    [0,0,0,0,0,0,0].map((i)=>
                      <li key={i}>
                        자산 ~~~원
                      </li>
                  )}
                </ul>
              </div>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-2xl font-semibold'>부채</p>
                <ul className='px-4 py-2 rounded-lg border shadow-lg'>
                  {
                    [0,0,0,0,0,0,0].map((i)=>
                      <li key={i}>
                        부채 ~~~원
                      </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  )
}

export default Home
