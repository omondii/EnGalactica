Web application that uses the Nasa API and the googlemaps Api to monitor objects in the universe.  Returns visible objects in the users location night sky.
Technologies
Python
Flask
React
Redis


## NASA Near Earth Object Web Service API
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY
The api responds with;

    - links: Contains URLs for fetching the next and previous set of data from the API.
    -element_count: The total number of near earth objects in this data set.
    -near_earth_objects: An object where each key is a date and the value is an array of objects, each representing an asteroid.

Each asteroid object contains the following properties:

    -links: Contains a URL for fetching detailed data about this specific asteroid.
    -id: The unique identifier of the asteroid.
    -neo_reference_id: Another identifier of the asteroid.
    -name: The name of the asteroid.
    -nasa_jpl_url: A URL for the Jet Propulsion Laboratory’s Small-Body Database Browser where you can find more detailed information about this asteroid.
    -absolute_magnitude_h: The absolute magnitude of the asteroid.
    -estimated_diameter: An object containing estimated diameters of the asteroid in various units (kilometers, meters, miles, and feet).
    -is_potentially_hazardous_asteroid: A boolean indicating whether the asteroid is potentially hazardous.
    -close_approach_data: An array of objects, each representing a close approach event. Each event includes the date of close approach, the relative velocity of the asteroid at the time of close approach, the miss distance, and the orbiting body (usually ‘Earth’).
