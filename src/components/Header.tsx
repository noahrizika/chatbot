import ButtonLink from '@/components/links/ButtonLink';

const Header = () => {
  return (
    <header className='p-4 border-b border-gray-200 bg-gray-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-blue-500 text-xl font-bold'>
          <a href='/'>ExpertsConnect</a>
        </h1>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <ButtonLink
                variant='light'
                rel='noopener noreferrer'
                href='https://github.com/noahrizika/chatbot'
              >
                About
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                variant='light'
                rel='noopener noreferrer'
                href='https://noahrizika.github.io/'
              >
                Contact
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
