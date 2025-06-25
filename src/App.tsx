import { Table } from './components/ui/Table';
import { useFinances } from './hooks/useFinances';
import { Loading } from './components/ui/Loading';
import { Error } from './components/ui/Error';

function App() {
  const { data, error, loading } = useFinances();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {data ? <Table data={data} /> : <Error message="No data available" />}
    </div>
  );
}

export default App;
