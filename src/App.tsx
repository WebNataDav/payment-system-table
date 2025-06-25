import { Table } from './components/ui/Table';
import { useFinances } from './hooks/useFinances';
import { Loading } from './components/ui/Loading';

function App() {
  const { data, error, loading } = useFinances();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {data && <Table data={data} />}
      {error && <p>Something went wrong...</p>}
    </div>
  );
}

export default App;
