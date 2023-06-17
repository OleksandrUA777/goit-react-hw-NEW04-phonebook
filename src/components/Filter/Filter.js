import PropTypes from 'prop-types';

export const Filter = ({ value, onFilterSearch }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={value}
          onChange={onFilterSearch}
        />
      </label>
    </>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterSearch: PropTypes.func.isRequired,
};
