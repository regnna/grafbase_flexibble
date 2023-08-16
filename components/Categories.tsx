"use client"
import { categoryFilters } from '@/constant';
import {usePathname,useRouter,useSearchParams} from 'next/navigation';

const Categories = () => {
    const router=useRouter();
    const pathName=usePathname();
    const searchParams =useSearchParams();

    const category=searchParams.get('category');
    // console.log(category)
    const handleTags=(filter:string)=>{
        if(filter==='all'){
            router.push(`/`)

        }
        else{
        router.push(`${pathName}?category=${filter}`)
        }
    }

  return (
   <div className='flexBetween w-full gap-5 flex-wrap'>
    <ul className='flex gap-3 overflow-auto no-scrollbar'>
        {category===null && (
            <button type='button' 
            onClick={()=>handleTags('all')}
            className={`bg-purple-400 text-light-white font-medium  px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >All</button>
        )}
        {category && (
            <button type='button' 
            onClick={()=>handleTags('all')}
            className={`font-normal px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >All</button>
        )}
        {categoryFilters.map((filter)=>(
            <button
            key={filter}
            type='button'
            onClick={()=>handleTags(filter)}
            className={`${category===filter?'bg-purple-400 text-light-white font-medium':'font-normal'}px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >{filter}
            </button>
        ))}
    </ul>

   </div>
  )
}

export default Categories