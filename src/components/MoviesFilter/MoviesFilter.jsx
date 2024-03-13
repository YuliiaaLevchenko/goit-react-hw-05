import { useSearchParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import css from './MoviesFilter.module.css';

const MoviesFilter = () => {
    const [params, setParams] = useSearchParams();

    const changeFilter = newFilter => {
        params.set('query', newFilter);
        setParams(params);
      };
      const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements.query.value.trim();
        if (!query) {
          toast.error('Please enter anything!');
          return;
        }
        if (query.length < 1) {
          toast.error('Too shot!');
          return;
        }
        if (query.length > 50) {
          toast.error('Too long!');
          return;
        }
    
        changeFilter(query);
    
        form.reset();
      };

    return (
<>
<form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoFocus={true}
          required
        ></input>
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      <Toaster />
</>
    );
}

export default MoviesFilter




