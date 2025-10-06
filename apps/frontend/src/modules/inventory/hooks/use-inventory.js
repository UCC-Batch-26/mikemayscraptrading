import { useCallback, useReducer } from 'react';

const STATE_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

const ACTION_TYPE = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initialState = {
  status: STATE_STATUS.IDLE,
  data: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.PENDING:
      return {
        ...state,
        ...initialState,
        status: STATE_STATUS.PENDING,
      };

    case ACTION_TYPE.SUCCESS:
      return {
        ...state,
        status: STATE_STATUS.SUCCESS,
        data: action.payload,
      };

    case ACTION_TYPE.FAILED:
      return {
        ...state,
        status: STATE_STATUS.FAILED,
        data: action.payload,
      };

    default:
      return state;
  }
}

const INVENTORY_URL = `${import.meta.env.VITE_BACKEND_URL}/api/items/`;

export function useInventory() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Creates new inventory items
  async function addInventory(payload) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      // Handle FormData for file uploads or regular JSON
      const isFormData = payload instanceof FormData;

      const requestOptions = {
        method: 'POST',
        body: isFormData ? payload : JSON.stringify(payload),
      };

      // Only set Content-Type for JSON, let browser set it for FormData
      if (!isFormData) {
        requestOptions.headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(INVENTORY_URL, requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to request: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: responseData });
    } catch (error) {
      console.log('Failed Adding Inventory Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  //Fetch all inventory items with optional filtering
  async function allInventories(params = {}) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      // Build query string from params
      const queryParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      const queryString = queryParams.toString();
      const url = queryString ? `${INVENTORY_URL}?${queryString}` : INVENTORY_URL;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to request: ${response.status}`);
      }

      const responseData = await response.json();

      // Handle both direct items array and paginated response
      const data = responseData.items || responseData.data || responseData;

      dispatch({
        type: ACTION_TYPE.SUCCESS,
        payload: {
          items: data,
          pagination: responseData.pagination || null,
          total: responseData.total || data.length,
        },
      });
    } catch (error) {
      console.log('Failed Getting All Inventories Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  //Fetch single inventory item by ID
  async function viewInventory(id) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      if (!id) {
        throw new Error('Inventory ID is required');
      }

      const response = await fetch(`${INVENTORY_URL}/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inventory item not found');
        }
        throw new Error(`Failed to request: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: responseData });
    } catch (error) {
      console.log('Failed Getting Inventory Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  //Update existing inventory item
  async function updateInventory(id, payload) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      if (!id) {
        throw new Error('Inventory ID is required');
      }

      // Handle FormData for file uploads or regular JSON
      const isFormData = payload instanceof FormData;

      const requestOptions = {
        method: 'PUT',
        body: isFormData ? payload : JSON.stringify(payload),
      };

      // Only set Content-Type for JSON, let browser set it for FormData
      if (!isFormData) {
        requestOptions.headers = {
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(`${INVENTORY_URL}/${id}`, requestOptions);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inventory item not found');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to request: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: responseData });
    } catch (error) {
      console.log('Failed Updating Inventory Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  async function deleteInventory(id) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      if (!id) {
        throw new Error('Inventory ID is required');
      }

      const response = await fetch(`${INVENTORY_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inventory item not found');
        }
        throw new Error(`Failed to request: ${response.status}`);
      }

      const responseData = await response.json().catch(() => ({ success: true }));
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: responseData });
    } catch (error) {
      console.log('Failed Deleting Inventory Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  async function updateInventoryStock(id, operation) {
    dispatch({ type: ACTION_TYPE.PENDING });
    try {
      if (!id) {
        throw new Error('Inventory ID is required');
      }

      const response = await fetch(`${INVENTORY_URL}/${id}/stock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operation),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Inventory item not found');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to request: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch({ type: ACTION_TYPE.SUCCESS, payload: responseData });
    } catch (error) {
      console.log('Failed Updating Inventory Stock Request:', error);
      dispatch({ type: ACTION_TYPE.FAILED, payload: error?.message ?? 'Something went wrong' });
    }
  }

  return {
    addInventory: useCallback(addInventory, []),
    allInventories: useCallback(allInventories, []),
    viewInventory: useCallback(viewInventory, []),
    updateInventory: useCallback(updateInventory, []),
    deleteInventory: useCallback(deleteInventory, []),
    updateInventoryStock: useCallback(updateInventoryStock, []),
    isPending: state.status === STATE_STATUS.PENDING,
    isSuccess: state.status === STATE_STATUS.SUCCESS,
    isFailed: state.status === STATE_STATUS.FAILED,
    isIdle: state.status === STATE_STATUS.IDLE,
    ...state,
  };
}
