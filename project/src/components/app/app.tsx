import Main from '../main/main';

type AppScreenProps = {
  cardsCount: number,
}

function App({ cardsCount }: AppScreenProps): JSX.Element {
  return (
    <Main cardsCount={cardsCount} />
  );
}

export default App;
