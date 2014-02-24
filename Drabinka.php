<?php

/**
 * Description of Crabinka
 *
 * @author Fake
 */
class Drabinka 
{
    
    private $players;
    
    public function __construct() 
    {
        $this->players = array();
    }
    
    public function AddOnePlayer($player)
    {
        $this->players[] = $player;
    }
    
    /**
     * ala
     * @param string $players Takes players from textarea
     */
    public function AddMorePlayer($players)
    {
        $this->players = preg_split("/\r\n|\r|\n/", $players);
    }
    
    /**
     * Displays Players
     * TODO: Change later to display ladder
     */
    public function ShowPlayers()
    {
        foreach ($this->players as $key => $value) {
            echo "$key - $value</br>";
        }
    }
}
