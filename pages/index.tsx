import type { NextPage } from 'next'
import Layout from '../components/layout'
import useSWR from 'swr'
import { Asset, User } from '@prisma/client'
import { useMemo } from 'react'
import useMutation from '../libs/usemutation'
import { useForm } from 'react-hook-form'
 
interface Response {
  assets : Asset[]
  user : User
}

interface UploadForm {
  title: string
  income : number
  outcome : number
  price : number
  debt : number
}

interface UploadAssetMutation {
  asset : Asset;
}

const Home: NextPage = () => {
  const { data, mutate } = useSWR<Response>('/api/assets')
  const [ upload, {loading,data : uploadDate} ] = useMutation("/api/assets")
  const { register, handleSubmit, reset } = useForm<UploadForm>();

  const onValid = (data: UploadForm) => {
    if(!data.debt) data.debt=0
    if(!data.price) data.price=0
    if(!data.income) data.income=0
    if(!data.outcome) data.outcome=0
    upload(data)
    mutate()
    reset()
  }

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
      const totalDebt = data?.assets.map(d=>d.debt).reduce((p,c)=>p+c, 0)
      
      return totalPrice - totalDebt
    }
  }, [data])

  const deleteAsset = async ( id : number ) => {
    const res = await fetch(`/api/assets/${id}`, 
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data)
        })
    mutate()
    return res.json()
  }

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
                    a.debt === 0 ? null 
                    : <li key={a.id}>
                      {a.title} - {a.debt}만원
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onValid)} className='flex flex-col px-6 py-2 mt-12 space-y-2'>
            <h3 className='mb-6 text-2xl font-semibold text-center'>자산 추가하기</h3>
            <input type='text' {...register('title', {required :true})} placeholder='자산이름' />
            <input type='number' {...register('income', {required :false})} placeholder='수입' />
            <input type='number' {...register('outcome', {required :false})} placeholder='지출' />
            <input type='number' {...register('price', {required :false})} placeholder='가격' />
            <input type='number' {...register('debt', {required :false})} placeholder='대출' />
            <button type='submit' className='px-4 py-1 text-white bg-teal-500 rounded-full hover:bg-teal-600'>추가하기</button>
          </form>

          <ul className='flex flex-col px-4 py-2 mt-8 space-y-2'>
            <h2 className='text-2xl font-semibold'>자산/부채 리스트</h2>
            {
              data?.assets.map((a) => {
                return <li key={a.id}>
                  <div className='flex items-center justify-between'>
                    <p> {a.title} </p>
                    <button onClick={()=>deleteAsset(a.id)}>삭제</button>
                  </div>
                </li>})
            }
          </ul>
        </main>
      </Layout>
    </>
  )
}

export default Home

