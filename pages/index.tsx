import type { NextPage } from 'next'
import Layout from '../components/layout'
import useSWR from 'swr'
import { Asset } from '@prisma/client'
import { useMemo } from 'react'
 
interface Response {
  assets : Asset[]
}

const Home: NextPage = () => {
  const { data } = useSWR<Response>('/api/assets')

  const totalCashFlow = useMemo(()=>{
    if(data){
      const totalIncome = data?.assets.map(d=>d.income).reduce((p,c)=>p+c, 0)
      const totalOutcome = data?.assets.map(d=>d.outcome).reduce((p,c)=>p+c, 0)
      
      return totalIncome - totalOutcome
    }
  }, [data])

  const totalAssetPrice = useMemo(()=>{
    if(data){
      const totalPrice = data?.assets.map(d=>d.price).reduce((p,c)=>p+c, 0)
      const totalDebt = data?.assets.map(d=>d.dept).reduce((p,c)=>p+c, 0)
      
      return totalPrice - totalDebt
    }
  }, [data])
  return (
    <>
      <Layout>
        <main className='max-w-6xl px-4 py-2 mx-auto'>
          <div className='flex flex-col px-4 py-2 mt-8 space-y-4 text-2xl font-semibold'>
            <h3>현금흐름 : {totalCashFlow}만원</h3>
            <h3>순자산 : {totalAssetPrice}만원</h3>
          </div>
          
          <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-center'>손익계산서</h2>
            <div className='grid grid-cols-1 mt-4 lg:grid-cols-2'>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-xl font-semibold'>소득</p>
                <ul className='px-4 py-2 border rounded-lg shadow-lg'>
                  {
                    data?.assets.map((a)=>
                    a.income === 0 ? null :
                    <li key={a.id}>
                        {a.title} - {a.income}만원
                      </li>
                  )}
                </ul>
              </div>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-xl font-semibold'>지출</p>
                <ul className='px-4 py-2 border rounded-lg shadow-lg'>
                  {
                    data?.assets.map((a)=>
                    a.outcome === 0 ? null 
                    : <li key={a.id}>
                      {a.title} - {a.outcome}만원
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <h2 className='mt-12 text-2xl font-semibold text-center'>대차대조표</h2>
            <div className='grid grid-cols-1 mt-4 lg:grid-cols-2'>
            <div className='px-4 py-2 space-y-2'>
                <p className='text-xl font-semibold'>자산</p>
                <ul className='px-4 py-2 border rounded-lg shadow-lg'>
                  {
                    data?.assets.map((a)=>
                    a.price === 0 ? null 
                    : <li key={a.id}>
                      {a.title} - {a.price}만원
                    </li>
                  )}
                </ul>
              </div>
              <div className='px-4 py-2 space-y-2'>
                <p className='text-xl font-semibold'>부채</p>
                <ul className='px-4 py-2 border rounded-lg shadow-lg'>
                  {
                    data?.assets.map((a)=>
                    a.dept === 0 ? null 
                    : <li key={a.id}>
                      {a.title} - {a.dept}만원
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <ul className='flex flex-col px-4 py-2 mt-8 space-y-2 text-xl font-semibold'>
            {
              data?.assets.map((a) => 
              <li key={a.id}>
                {a.title}
              </li>)
            }
          </ul>
        </main>
      </Layout>
    </>
  )
}

export default Home

