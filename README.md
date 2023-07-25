# Bitespeed

# What I Understand from the Challenge:


The challenge requires creating a post route "/identify" with the following functionalities:

## If both entries are filled, both the Find and Create functions will be called.


## *If both entries are not filled, only the Find function will be called.


## If the Create function is called, certain conditions need to be checked:

    
    * If both entries are found in the database, but belonging to different users, the secondary account becomes primary.
    
    
    * If one entry is found, a secondary account will be created.
    
    
    * If no entry is found, a primary account will be created.
