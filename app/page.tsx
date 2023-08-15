import { ProjectInterface } from '@/common.types'
import { fetchAllProjects } from '@/lib/actions'
import React from 'react'
import ProjectCard from '@/components/ProjectCard'
import Categories from '@/components/Categories'
import LoadMore from '@/components/LoadMore'

type ProjectSearch={
  projectSearch:{
    edges:{
      node: ProjectInterface
    }[];
    pageInfo:{
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor:string;
      endCursor:string;

    }
  }
}

type SearchParams={
  category?:string|null;
  endcursor?:string|null;
}

type Props={
  searchParams:SearchParams
}


// export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async({searchParams:{category,endcursor}}:Props) => {

  const data =await fetchAllProjects(category,endcursor) as ProjectSearch;

  const projectToDisplay=data?.projectSearch?.edges|| [];

  if(projectToDisplay.length===0)  {
    return(
      <section className='flexStart flex-col paddings '>
        <Categories/>
        <p className='no-result-text text-center'>No Project found, go create some first</p>

      </section>
    )
  }

  // const pagination= data?.projectSearch?.pageInfo;
  return (
    <section className='flex-start flex-col paddings mb-16'>
        <Categories/>
        <section className="projects-grid">
        {projectToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
              key={`{node?.id}`}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy.name}
              avatarUrl={node?.createdBy.avatarUrl}
              userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      />
    </section>
  )
};

export default Home