import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ============================================================================
// EXERCISE 1: FORM MANAGEMENT CUSTOM HOOK & REGISTRATION COMPONENT
// ============================================================================

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

function useForm<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => FormErrors
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  }

  async function handleSubmit(
    e: React.FormEvent,
    onSubmit: (formValues: T) => Promise<void>
  ): Promise<void> {
    e.preventDefault();
    const validationErrors = validate(values);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      await onSubmit(values);
      setValues(initialValues);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : 'An unhandled submission error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}

export function RegistrationForm() {
  const initialValues = { email: '', password: '' };

  function validate(values: typeof initialValues): FormErrors {
    const errors: FormErrors = {};
    if (!values.email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }
    if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    return errors;
  }

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  async function handleFormSubmit(formValues: typeof initialValues): Promise<void> {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (formValues.email === 'error@test.com') {
          reject(new Error('This email domain is blacklisted from registrations.'));
        } else {
          resolve(true);
        }
      }, 1000);
    });
    alert('Account created successfully!');
  }

  return (
    <form 
      onSubmit={(e) => handleSubmit(e, handleFormSubmit)} 
      style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '4px', maxWidth: '350px' }}
    >
      <h3>Exercise 1: Registration Form</h3>
      
      {errors.submit && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{errors.submit}</div>}
      
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={values.email} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '4px' }}>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={values.password} 
          onChange={handleChange} 
          style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
        />
        {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
      </div>

      <button type="submit" disabled={isSubmitting} style={{ padding: '6px 12px', cursor: 'pointer' }}>
        {isSubmitting ? 'Registering...' : 'Submit Registration'}
      </button>
    </form>
  );
}

// ============================================================================
// EXERCISE 2: GENERIC DATA TABLE COMPONENT
// ============================================================================

interface TableColumn<T> {
  title: string;
  key: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onSelect?: (selectedIds: Array<T[keyof T]>) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onSort,
  onSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedIds, setSelectedIds] = useState<Set<T[keyof T]>>(new Set());

  function handleHeaderClick(column: TableColumn<T>): void {
    if (!column.sortable) return;

    let nextDirection: 'asc' | 'desc' = 'asc';
    if (sortKey === column.key && sortDirection === 'asc') {
      nextDirection = 'desc';
    }

    setSortKey(column.key);
    setSortDirection(nextDirection);

    if (onSort) {
      onSort(column.key, nextDirection);
    }
  }

  function handleRowCheckboxChange(id: T[keyof T]): void {
    const nextSet = new Set(selectedIds);
    if (nextSet.has(id)) {
      nextSet.delete(id);
    } else {
      nextSet.add(id);
    }
    setSelectedIds(nextSet);
    if (onSelect) {
      onSelect(Array.from(nextSet));
    }
  }

  function handleSelectAllChange(): void {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
      if (onSelect) onSelect([]);
    } else {
      const allIds = data.map((row) => row.id as T[keyof T]);
      setSelectedIds(new Set(allIds));
      if (onSelect) onSelect(allIds);
    }
  }

  const processedRows = useMemo(() => {
    if (onSort || !sortKey) return data;

    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      
      const modifier = sortDirection === 'asc' ? 1 : -1;
      return valA > valB ? modifier : -modifier;
    });
  }, [data, sortKey, sortDirection, onSort]);

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '2px solid #ccc' }}>
          <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd', width: '40px' }}>
            <input 
              type="checkbox" 
              checked={isAllSelected} 
              onChange={handleSelectAllChange} 
            />
          </th>
          {columns.map((col) => (
            <th 
              key={String(col.key)} 
              onClick={() => handleHeaderClick(col)}
              style={{ 
                padding: '8px', 
                textAlign: 'left', 
                border: '1px solid #ddd', 
                cursor: col.sortable ? 'pointer' : 'default',
                userSelect: 'none'
              }}
            >
              {col.title} {sortKey === col.key ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {processedRows.map((row) => (
          <tr key={String(row.id)} style={{ borderBottom: '1px solid #eee' }}>
            <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              <input 
                type="checkbox" 
                checked={selectedIds.has(row.id as T[keyof T])} 
                onChange={() => handleRowCheckboxChange(row.id as T[keyof T])} 
              />
            </td>
            {columns.map((col) => (
              <td key={String(col.key)} style={{ padding: '8px', border: '1px solid #ddd' }}>
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================================
// EXERCISE 3: DATA FETCHING AND CACHING SYSTEM
// ============================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface FetchConfig {
  maxAge: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

function useDataFetching<T>(url: string, config: FetchConfig) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const cacheMap = useRef<Map<string, CacheEntry<T>>>(new Map());

  const executeFetch = useCallback(async (forceBypassCache = false) => {
    setLoading(true);
    setError(null);

    const cachedItem = cacheMap.current.get(url);
    const now = Date.now();

    if (!forceBypassCache && cachedItem && (now - cachedItem.timestamp < config.maxAge)) {
      setData(cachedItem.data);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned HTTP status code: ${response.status}`);
      }
      const fetchedData = (await response.json()) as T;
      
      cacheMap.current.set(url, {
        data: fetchedData,
        timestamp: Date.now(),
      });
      
      setData(fetchedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected fetch error occurred');
    } finally {
      setLoading(false);
    }
  }, [url, config.maxAge]);

  function invalidateCache(): void {
    cacheMap.current.delete(url);
  }

  function refetch(): void {
    executeFetch(true);
  }

  function clearCacheAndRefetch(): void {
    invalidateCache();
    executeFetch(true);
  }

