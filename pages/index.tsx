import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Link from 'next/link';
import Header from '../components/Header/Header';
import Leading from '../components/Leading/Leading';
import Grid from '../components/Grid/Grid';
import Card from '../components/Card/Card';
import Spinner from '../components/Spinner/Spinner';
import WOMAN1920 from '/public/woman_1920.jpg';
import WOMAN1280 from '/public/woman_1280.jpg';
import WOMAN640 from '/public/woman_640.jpg';
import { useFetchProjects } from '../utils/fetchHooks'
import { IMAGE_BASE_URL } from '../config';
import Error from './500';
import Head from 'next/head'

interface Project {
  frontendLanguages: { name: string }[];
  backendLanguages: { name: string }[];
  tools: { name: string }[];
}

const Home: NextPage = () => {
  const [query, setQuery] = useState("");
  const { data, fetchNextPage, isLoading, isFetching, error } = useFetchProjects(query);
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);


  // La fonction scrollHandler est appelée à chaque fois que l'utilisateur scroll
  // https://www.kindacode.com/article/react-typescript-handling-onscroll-event/
  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;

    if ((scrollTop + containerHeight) / scrollHeight >= 0.9) {
      fetchNextPage();
    }
  };

  if (error) return <Error />;

  const handleClick = () => {
    setLoading(true);
  }

  const itemsDisplay = (project: Project) => {
    const displayItems: { name: string }[] = [];

    project.frontendLanguages.forEach((item) => {
      displayItems.push(item);
    }
    );
    project.backendLanguages.forEach((item) => {
      displayItems.push(item);
    }
    );

    project.tools.forEach((item) => {
      displayItems.push(item);
    }
    );

    return displayItems;
  };

  return (
    <>
      <Head>
        <title>Edith - Développeuse web</title>
        <meta name='description' content='Edith - Développeuse web Symfony - portfolio' />
        <meta property='og:title' content='Edith - Développeuse web' key='title' />
        <meta property='og:description' content='Edith - Développeuse web - portfolio' />
        <meta property='og:url' content='https://edithbredon.fr' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='main-element relative h-screen overflow-y-scroll' onScroll={scrollHandler}>
        <Header />
        <Leading
          imgUrl={width > 1280 ? WOMAN1920 : width > 640 && width <= 1280 ? WOMAN1280 : WOMAN640}
          title='À propos de moi'
          text="Bonjour, je suis Edith. Curieuse, créative, j’aime apprendre de nouvelles choses et relever les défis ! Passionnée par le développement web, je suis toujours à la recherche de nouvelles technologies et de nouveaux outils pour améliorer mes compétences. J'aime travailler en équipe et aider les autres."
          quote="« La connaissance théorique est un trésor dont la pratique est la clé.»"
          quoteAuthor='Heber J. Grant'
        />
        {loading && <Spinner />}
        <Grid
          className='px-6 mt-4 w-full md:w-6/6 mb-4 md:mt-10'
          setQuery={setQuery}
          title={
            query && !isLoading && !isFetching && data && data.pages && data.pages[0].results.length === 0 ? `Aucun résultat pour "${query}"`
              : query && !isLoading && !isFetching && data && data.pages && data.pages[0].results.length > 0 ? `Résultats de la recherche "${query}"`
                : 'Découvrir mes projets'}
        >
          {data && data.pages
            && data.pages.map(page =>
              page.results.map((project) => (
                project.status === 'en ligne' && (
                  <Link key={project.id} href={`${project.slug}`} passHref onClick={handleClick}>
                    <div className='cursor-pointer hover:opacity-80 duration-300'>
                      <Card
                        title={project.name}
                        imgUrl={project.imageName ? IMAGE_BASE_URL + project.imageName : '/no_image.jpg'}
                        displayOneList={itemsDisplay(project)}
                      />
                    </div>
                  </Link>
                ))
              ))}
          {data && data.pages && data.pages.length == 0 && (
            <div className='text-center text-2xl font-bold'>No results found</div>
          )}
        </Grid>
        {isLoading || isFetching ? <Spinner /> : null}
      </main>
    </>
  )
};

export default Home;
