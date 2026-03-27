import requests
import time

def measure_load_time(url: str) -> float:
    """
    Measures the time taken (in seconds) for a webpage to fully load.
    
    Args:
        url: The full web address (including http/https).
        
    Returns:
        The load time in seconds, or -1.0 if the request fails.
    """
    try:
        # Record start time
        start = time.perf_counter()
        
        # Perform the GET request
        response = requests.get(url, timeout=10)
        
        # Ensure the content is fully downloaded to measure 'complete' response
        _ = response.content 
        
        # Record end time
        end = time.perf_counter()
        
        return end - start
    except requests.RequestException as e:
        print(f"Error connecting to {url}: {e}")
        return -1.0

if __name__ == "__main__":
    # List of sites to test
    test_sites = [
        "https://www.google.com",
        "https://www.ynet.co.il",
        "https://www.imdb.com",
        "https://www.github.com"
    ]
    
    print(f"{'URL':<30} | {'Load Time (s)':<15}")
    print("-" * 50)
    
    for site in test_sites:
        load_time = measure_load_time(site)
        if load_time != -1.0:
            print(f"{site:<30} | {load_time:>12.4f}s")
